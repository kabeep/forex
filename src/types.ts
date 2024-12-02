export interface HttpResponse<T> {
    code: number;
    message: string;
    data?: T;
}
