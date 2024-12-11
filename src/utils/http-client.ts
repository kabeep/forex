import HttpRequest from './http-request';
import type { HttpRequestOptions, HttpResponse } from './types';

class HttpClient extends HttpRequest {
    constructor(options: HttpRequestOptions = {}) {
        super(options);
    }

    protected async get<T>(
        url: string,
        options: RequestInit = {},
    ): Promise<HttpResponse<T>> {
        const requestOptions = new Request(url, {
            ...options,
            method: 'GET',
            headers: { ...this.headers, ...options.headers },
        });

        return this._fetch<T>(requestOptions);
    }
}

export default HttpClient;
