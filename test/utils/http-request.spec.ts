import { afterEach, beforeAll, describe, expect, it, vi } from 'vitest';
import { HttpRequest, type HttpResponse } from '../../src';

describe('HttpRequest', () => {
    // @ts-expect-error: TS2503 Cannot find namespace vi
    let fetchMock: vi.Mock;

    const url = 'https://example.com/';
    const client: HttpRequest = new HttpRequest();
    // @ts-expect-error: TS2445 Property _fetch is protected and only accessible within class HttpRequest and its subclasses.
    const clientFetch = (signal?: AbortSignal) => client._fetch<HttpResponse>(new Request(url), signal);

    beforeAll(() => {
        fetchMock = vi.fn();
        global.fetch = fetchMock;
    });

    afterEach(() => {
        vi.clearAllMocks();
    });

    it('should return a response with the correct structure on success', async () => {
        const responseText = 'Success';

        const mockData = {
            ok: true,
            text: async () => responseText,
            headers: new Headers(),
        };
        fetchMock.mockResolvedValue(mockData);

        const expected = {
            code: 200,
            message: 'OK',
            data: responseText,
        };
        const response = await clientFetch();
        expect(response).toEqual(expected);
    });

    it('should return a response with default values if response is not ok', async () => {
        fetchMock.mockResolvedValue({ ok: false });

        const expected = {
            code: 500,
            message: 'Internal Server Error',
            data: undefined,
        };
        const response = await clientFetch();
        expect(response).toEqual(expected);
    });

    it('should throw an error when request is aborted (AbortError)', async () => {
        const controller = new AbortController();
        fetchMock.mockRejectedValue(new DOMException('Aborted', 'AbortError'));

        try {
            await clientFetch(controller.signal);
        } catch (error) {
            expect((error as Error).message).toBe('Request timeout or aborted');
        }
    });

    it('should throw an error when fetch fails with another error', async () => {
        fetchMock.mockRejectedValue(new Error('Network Error'));

        try {
            await clientFetch();
        } catch (error) {
            expect(error).toBeInstanceOf(Error);
            expect((error as Error).message).toBe('Network Error');
        }
    });
});
