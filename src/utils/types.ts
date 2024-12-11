export interface HttpRequestOptions {
    timeout?: number;
    headers?: HeadersInit;
}

export interface HttpResponse<T> {
    code: number;
    message: string;
    data?: T;
}
