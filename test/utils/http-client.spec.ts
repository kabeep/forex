import { afterEach, beforeAll, describe, expect, it, vi } from 'vitest';
import { HttpClient } from '../../src/utils';

describe('HttpClient', () => {
    // @ts-expect-error TS2503: Cannot find namespace vi
    let fetchMock: vi.Mock;

    const url = 'https://example.com/';
    const client = new HttpClient({ timeout: 100 });
    // @ts-expect-error TS2345: Argument of type string is not assignable to parameter of type never
    const getSpy = vi.spyOn(client, 'get');
    // @ts-expect-error TS2445: Property get is protected and only accessible within class HttpClient and its subclasses.
    const clientGet = (url: string) => client.get<unknown>(url);

    const requestHeader = new Headers({
        'Content-Type': 'application/json; charset=utf-8',
    });
    const responseData = { data: 'sample data' };

    beforeAll(() => {
        fetchMock = vi.fn();
        global.fetch = fetchMock;
    });

    afterEach(() => {
        vi.clearAllMocks();
    });

    it('should create an instance of HttpClient successfully without parameters', () => {
        const clientWithoutParams = new HttpClient();

        expect(clientWithoutParams).toBeInstanceOf(HttpClient);
        // @ts-expect-error TS2445: Property timeout is protected and only accessible within class HttpRequest and its subclasses.
        expect(clientWithoutParams.timeout).toBe(5000);
    });

    it('should make a GET request and return json', async () => {
        const mockData = {
            ok: true,
            headers: requestHeader,
            json: async () => responseData,
        };
        fetchMock.mockResolvedValueOnce(mockData);

        const expected = {
            code: 200,
            message: 'OK',
            data: { data: 'sample data' },
        };
        const response = await clientGet(url);
        expect(response).toStrictEqual(expected);

        expect(fetch).toHaveBeenCalledTimes(1);
        expect(getSpy).toHaveBeenCalledWith(url);
    });

    it('should return an empty data when request fails', async () => {
        const code = 404;
        const message = 'Not Found';
        const mockData = {
            ok: false,
            status: code,
            statusText: message,
            headers: requestHeader,
        };
        fetchMock.mockResolvedValueOnce(mockData);

        const expected = { code, message, data: undefined };
        const response = await clientGet(url);
        expect(response).toStrictEqual(expected);

        expect(fetch).toHaveBeenCalledTimes(1);
        expect(getSpy).toHaveBeenCalledWith(url);
    });
});
