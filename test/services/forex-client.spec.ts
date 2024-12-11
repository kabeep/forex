import { describe, expect, it } from 'vitest';
import { BASE_URL, BASE_URL_VERSION, ForexClient } from '../../src';

describe('ForexClient', () => {
    const requestHeader = new Headers({
        'Content-Type': 'application/json; charset=utf-8',
    });

    const client = new ForexClient({
        headers: requestHeader,
    });
    const prettifyClient = new ForexClient({
        minified: false,
    });
    const baseCurrencyClient = new ForexClient({
        baseCurrency: 'usd',
    });

    const createCommonExpected = (record: unknown) => ({
        code: 200,
        message: 'OK',
        data: record,
    });

    it('getCurrencies', async () => {
        const result = await client.getCurrencies();
        const expected = createCommonExpected(
            expect.arrayContaining([
                { code: 'eur', name: 'Euro' },
                { code: 'usd', name: 'US Dollar' },
                { code: 'cny', name: 'Chinese Yuan Renminbi' },
            ]),
        );
        expect(result).toMatchObject(expected);
    });

    it('getRates', async () => {
        const result = await baseCurrencyClient.getRates();
        const expected = createCommonExpected(
            expect.arrayContaining([
                { code: 'eur', rate: expect.any(Number) },
                { code: 'usd', rate: expect.any(Number) },
                { code: 'cny', rate: expect.any(Number) },
            ]),
        );
        expect(result).toMatchObject(expected);
    });

    it('getRate', async () => {
        const result = await baseCurrencyClient.getRate(undefined, 'CNY');
        const expected = createCommonExpected(expect.any(Number));
        expect(result).toStrictEqual(expected);
    });

    it('getCode', () => {
        expect(client.getCode('us')).toBe('USD');
        expect(client.getCode('CN')).toBe('CNY');
    })

    it('covert', async () => {
        const result = await baseCurrencyClient.convert(undefined, 'CN', 10);
        const expected = createCommonExpected(expect.any(Number));
        expect(result).toStrictEqual(expected);
    });

    it('_composeDataList', async () => {
        const _composeDataList = (
            ...args: [record: Record<string, unknown> | undefined, key: string]
            // @ts-expect-error TS2341: Property composeDataList is private and only accessible within class ForexClient
        ) => client.composeDataList(...args);
        expect(_composeDataList(undefined, 'test')).toStrictEqual([]);
        expect(_composeDataList({ foo: 1, bar: 2 }, 'test')).toStrictEqual([
            { code: 'foo', test: 1 },
            { code: 'bar', test: 2 },
        ])
    });

    it('_validCurrencyCode', () => {
        const _validCurrencyCode = (...args: [code?: string, type?: string]) =>
            // @ts-expect-error TS2341: Property validCurrencyCode is private and only accessible within class ForexClient
            client.validCurrencyCode(...args);
        expect(_validCurrencyCode('US')).toBe('USD');
        expect(_validCurrencyCode('RMB')).toBe('CNY');
        expect(() => _validCurrencyCode()).toThrowError(
            'Please specify the base currency code.',
        );
        expect(() => _validCurrencyCode('', 'test')).toThrowError(
            'Please specify the test currency code.',
        );
    });

    const date = new Date(2024, 11, 1);
    const invalidDate = new Date('test');
    const dateString = '2024-12-01';

    it('_getApiUrl', () => {
        const _getApiUrl = (...args: [date: Date | 'latest', source: string]) =>
            // @ts-expect-error TS2341: Property getApiUrl is private and only accessible within class ForexClient
            client.getApiUrl(...args);
        const _getPrettifyApiUrl = (
            ...args: [date: Date | 'latest', source: string]
        ) =>
            // @ts-expect-error TS2341: Property getApiUrl is private and only accessible within class ForexClient
            prettifyClient.getApiUrl(...args);

        const latestExpected = `${BASE_URL}@latest/${BASE_URL_VERSION}/currencies.min.json`;
        expect(_getApiUrl('latest', 'currencies')).toBe(latestExpected);
        const dateExpected = `${BASE_URL}@${dateString}/${BASE_URL_VERSION}/currencies/usd.json`;
        expect(_getPrettifyApiUrl(date, 'currencies/usd')).toBe(dateExpected);
    });

    it('_formatDate', () => {
        // @ts-expect-error TS2341: Property formatDate is private and only accessible within class ForexClient
        const _formatDate = (date?: Date | 'latest') => client.formatDate(date);
        expect(_formatDate('latest')).toBe('latest');
        expect(_formatDate(invalidDate)).toBe('latest');
        expect(_formatDate(date)).toBe(dateString);
    });
});
