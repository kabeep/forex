import type { HttpResponse } from '../types';
import HttpRequest from './http-request';

class HttpClient extends HttpRequest {
    constructor(
        options: { timeout?: number; headers?: Record<string, string> } = {},
    ) {
        super(options);
    }

    async get<T>(
        url: string,
        options: RequestInit = {},
        externalSignal?: AbortSignal,
    ): Promise<HttpResponse<T>> {
        const request = new Request(url, {
            ...options,
            method: 'GET',
            headers: { ...this.headers, ...options.headers },
        });

        return this._fetch<T>(request, externalSignal);
    }
}

export default HttpClient;
