import type { HttpRequestOptions } from '../utils/types';

export interface ForexClientOptions extends HttpRequestOptions {
    baseCurrency?: string;
    minified?: boolean;
}

export interface AvailableCurrency {
    code: string;
    name: string;
}

export type OriginalExchangeRates = {
    [key: string]: Record<string, number>;
} & { date: string };

export interface ExchangeRate {
    code: string;
    rate: number;
}
