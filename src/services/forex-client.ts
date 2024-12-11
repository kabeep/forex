import {
    BASE_URL,
    BASE_URL_VERSION,
    LOCALE_CURRENCY,
    NON_STANDARD_CODES,
} from '../constants';
import { HttpClient } from '../utils';
import type { HttpResponse } from '../utils/types';
import type {
    AvailableCurrency,
    ExchangeRate,
    ForexClientOptions,
    OriginalExchangeRates,
} from './types';

/**
 * A client to interact with the Forex API for fetching currency rates and conversion data
 */
class ForexClient extends HttpClient {
    private static MINIFIED = true;

    private readonly options: Pick<
        ForexClientOptions,
        'baseCurrency' | 'minified'
    >;

    /**
     * Creates a new instance of ForexClient
     * @param {ForexClientOptions} [options={}] - The options for configuring the client
     * @param {string} options.baseCurrency - The base currency code
     * @param {boolean} options.minified - Minified JSON format
     * @param {number} options.timeout - Request timeout (milliseconds)
     * @param {HeadersInit} options.headers - Request header
     */
    constructor(options: ForexClientOptions = {}) {
        const {
            baseCurrency,
            minified = ForexClient.MINIFIED,
            ...restOptions
        } = options;
        super(restOptions);
        this.options = { baseCurrency, minified };
    }

    /**
     * Fetches the list of available currencies
     * @param {Date | "latest"} [date="latest"] - The date for fetching currencies, or `"latest"` for the most recent
     * @param {RequestInit} [options={}] - Additional request options
     * @returns A list of available currencies
     *
     * @example
     * // => {
     * //    code: 200,
     * //    message: 'OK',
     * //    data: [
     * //        { code: 'eur', name: 'Euro' },
     * //        { code: 'usd', name: 'US Dollar' },
     * //         { code: 'cny', name: 'Chinese Yuan Renminbi' },
     * //         ... More items
     * //    ]
     * // }
     * new ForexClient().getCurrencies('latest');
     */
    async getCurrencies(
        date: Date | 'latest' = 'latest',
        options: RequestInit = {},
    ): Promise<HttpResponse<AvailableCurrency[]>> {
        const url = this.getApiUrl(date, 'currencies');
        const response = await this.get<Record<string, string>>(url, options);
        return {
            ...response,
            data: this.composeDataList<AvailableCurrency>(
                response.data,
                'name',
            ),
        };
    }

    /**
     * Fetches the exchange rates for a specific currency
     * @param {string | undefined} [code=this.options.baseCurrency] - The currency code to get rates for
     * @param {Date | "latest"} [date="latest"] - The date for the rates, or `'latest'` for the most recent
     * @param {RequestInit} [options={}] - Additional request options
     * @returns A list of exchange rates
     *
     * @example
     * // => {
     * //    code: 200,
     * //    message: 'OK',
     * //    data: [
     * //        { code: 'eur', rate: 100_000 },
     * //        { code: 'usd', rate: 100_000 },
     * //        { code: 'cny', rate: 100_000 },
     * //        ... More items
     * //    ]
     * // }
     * new ForexClient().getRates('BTC');
     */
    async getRates(
        code: string | undefined = this.options.baseCurrency,
        date: Date | 'latest' = 'latest',
        options: RequestInit = {},
    ): Promise<HttpResponse<ExchangeRate[]>> {
        const lowercaseCode = this.validCurrencyCode(code).toLowerCase();
        const url = this.getApiUrl(date, `currencies/${lowercaseCode}`);
        const response = await this.get<OriginalExchangeRates>(url, options);

        return {
            ...response,
            data: this.composeDataList<ExchangeRate>(
                response.data?.[lowercaseCode],
                'rate',
            ),
        };
    }

    /**
     * Fetches the exchange rate between two currencies
     * @param {string | undefined} [baseCode=this.options.baseCurrency] - The base currency code
     * @param {string} destCode - The destination currency code
     * @param {Date | "latest"} [date="latest"] - The date for the rate, or `'latest'` for the most recent
     * @param {RequestInit} [options={}] - Additional request options
     * @returns The exchange rate
     *
     * @example
     * // => {
     * //    code: 200,
     * //    message: 'OK',
     * //    data: 100_000
     * // }
     * new ForexClient().getRate('BTC', 'USD');
     */
    async getRate(
        baseCode: string | undefined = this.options.baseCurrency,
        destCode?: string,
        date: Date | 'latest' = 'latest',
        options: RequestInit = {},
    ): Promise<HttpResponse<number>> {
        const lowercaseCode = this.validCurrencyCode(baseCode).toLowerCase();
        const url = this.getApiUrl(date, `currencies/${lowercaseCode}`);
        const response = await this.get<OriginalExchangeRates>(url, options);

        const rates = response.data?.[lowercaseCode];
        const lowercaseDestCode = this.validCurrencyCode(
            destCode,
            'destination',
        ).toLowerCase();
        return { ...response, data: rates?.[lowercaseDestCode] };
    }

    /**
     * Gets a valid currency code based on locale
     * @param {string} localeCode - The locale code to get currency code for
     * @returns The corresponding currency code
     *
     * @example
     * // => 'USD'
     * new ForexClient().getCode('US');
     *
     * @example
     * // => 'CNH'
     * new ForexClient().getCode('HK');
     *
     * @example
     * // => 'CNY'
     * new ForexClient().getCode('RMB');
     */
    getCode(localeCode: string) {
        return this.validCurrencyCode(localeCode, 'locale');
    }

    /**
     * Converts an amount from one currency to another
     * @param {string | undefined} [baseCode=this.options.baseCurrency] - The base currency code
     * @param {string} destCode - The destination currency code
     * @param {number} [amount=0] - The amount to convert
     * @param {Date | "latest"} [date="latest"] - The date for the conversion rate, or `'latest'` for the most recent
     * @param {RequestInit} [options={}] - Additional request options
     * @returns The converted amount
     *
     * @example
     * // => {
     * //    code: 200,
     * //    message: 'OK',
     * //    data: 100_000
     * // }
     * new ForexClient().convert('BTC', 'USD', 1);
     *
     * @example
     * // => {
     * //    code: 200,
     * //    message: 'OK',
     * //    data: 7.27
     * // }
     * new ForexClient().convert('US', 'HK', 1);
     */
    async convert(
        baseCode: string | undefined = this.options.baseCurrency,
        destCode?: string,
        amount: number | string = 0,
        date: Date | 'latest' = 'latest',
        options: RequestInit = {},
    ): Promise<HttpResponse<number>> {
        const response = await this.getRate(baseCode, destCode, date, options);
        const { data, ...restOptions } = response;
        return {
            data: data ? Number(amount) * data : undefined,
            ...restOptions,
        };
    }

    private composeDataList<T>(
        record: Record<string, unknown> | undefined,
        key: string,
    ): T[] {
        if (!record) return [];

        return Object.entries(record).map(([code, value]) => ({
            code,
            [key]: value,
        })) as T[];
    }

    private validCurrencyCode(code?: string, type = 'base'): string {
        if (!code) throw new Error(`Please specify the ${type} currency code.`);

        const additionalCodes = { ...LOCALE_CURRENCY, ...NON_STANDARD_CODES };

        return (
            additionalCodes[
                code.toUpperCase() as keyof typeof additionalCodes
            ] ?? code
        );
    }

    private getApiUrl(date: Date | 'latest', source: string) {
        const dateString = this.formatDate(date);
        const prefix = `${BASE_URL}@${dateString}/${BASE_URL_VERSION}`;
        const sourceExtension = this.options.minified ? 'min.json' : 'json';
        return `${prefix}/${source}.${sourceExtension}`;
    }

    private formatDate(date: Date | 'latest'): string {
        if (date === 'latest' || !this.isValidDate(date)) {
            return 'latest';
        }

        return `${date.getFullYear()}-${this.paddedDate(date.getMonth() + 1)}-${this.paddedDate(date.getDate())}`;
    }

    private isValidDate(value: unknown): value is Date {
        return this.isDate(value) && !Number.isNaN(value.getTime());
    }

    private isDate(value: unknown): value is Date {
        return (
            value instanceof Date ||
            (typeof value === 'object' &&
                Object.prototype.toString.call(value) === '[object Date]')
        );
    }

    private paddedDate(value: number | string, length = 2, padding = '0') {
        return `${value}`.padStart(length, padding);
    }
}

export default ForexClient;
