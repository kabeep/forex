import type { HttpResponse } from '../types';

class HttpRequest {
    private static TIMEOUT = 5000;

    protected readonly timeout: number;
    protected readonly headers: Record<string, string>;

    constructor(
        options: { timeout?: number; headers?: Record<string, string> } = {},
    ) {
        this.timeout = options.timeout || HttpRequest.TIMEOUT; // 默认超时 10秒
        this.headers = options.headers || {};
    }

    protected async _fetch<T = unknown>(
        request: Request,
        externalSignal?: AbortSignal,
    ): Promise<HttpResponse<T>> {
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), this.timeout);

        const signal = externalSignal || controller.signal;

        try {
            const response = await fetch(request.url, {
                ...request,
                signal,
            });

            clearTimeout(timeoutId);

            if (!response.ok) {
                return this.createResponse<T>(
                    response.status ?? 500,
                    response.statusText ?? 'Internal Server Error',
                );
            }

            const contentType = response.headers.get('Content-Type');
            const data = (
                contentType?.includes('application/json')
                    ? await response.json()
                    : await response.text()
            ) as T;

            return this.createResponse<T>(
                response.status ?? 200,
                response.statusText ?? 'OK',
                data,
            );
        } catch (error) {
            if (error instanceof DOMException && error.name === 'AbortError') {
                throw new Error('Request timeout or aborted');
            }
            throw error;
        }
    }

    private createResponse<T>(
        code: number,
        message: string,
        data?: T,
    ): HttpResponse<T> {
        return { code, message, data };
    }
}

export default HttpRequest;
