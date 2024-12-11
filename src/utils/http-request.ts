import type { HttpRequestOptions, HttpResponse } from './types';

class HttpRequest {
    private static TIMEOUT = 5000;
    private static REQUEST_HEADER: {
        'Content-Type': 'application/json; charset=utf-8';
    };

    protected readonly timeout: number;
    protected readonly headers: HeadersInit;

    constructor(options: HttpRequestOptions = {}) {
        this.timeout = options.timeout || HttpRequest.TIMEOUT;
        this.headers = options.headers || HttpRequest.REQUEST_HEADER;
    }

    protected async _fetch<T = unknown>(
        options: Request,
    ): Promise<HttpResponse<T>> {
        let timeoutId: string | number | NodeJS.Timeout | undefined;

        const requestHeader = { ...options } as Omit<Request, 'signal'> & {
            signal?: AbortSignal;
        };
        if (!requestHeader.signal) {
            const controller = new AbortController();
            requestHeader.signal = controller.signal;

            timeoutId = setTimeout(() => controller.abort(), this.timeout);
        }

        try {
            const response = await fetch(options.url, requestHeader);

            timeoutId && clearTimeout(timeoutId);

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
