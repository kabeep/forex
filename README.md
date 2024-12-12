<div align="center">

<h1>forex</h1>

💱 A JavaScript foreign exchange library via `fawazahmed0`'s API.

[![NodeJS][node-image]][node-url]
[![License][license-image]][license-url]
[![NPM][npm-image]][npm-url]
[![Codecov][codecov-image]][codecov-url]
[![BundlePhobia][bundle-phobia-image]][bundle-phobia-url]
[![CircleCI][circleci-image]][circleci-url]

English | [简体中文][zh-cn-url]

![Insights][insights-url]

</div>

## 📖 Introduction

> `forex` stands for `Foreign Exchange`, and its purpose is not `FX` trading.
> 
> Please use it with caution for investment-related decisions.

Get daily exchange rates in the browser or terminal for free and without rate limits.

See [documentation][docs-url] or [demo][demo-url].

## ⚙️ Installation

```bash
npm install @kabeep/forex --save
```

```bash
yarn add @kabeep/forex
```

```bash
pnpm add @kabeep/forex
```

## 🚀 Usage

#### CommonJS

```javascript
const { ForexClient } = require('@kabeep/forex');
```

#### ESModule

```javascript
import { ForexClient } from '@kabeep/forex';
```

---

#### Methods: `getCurrencies(date, options)`

Fetches the list of available currencies.

```typescript
const client = new ForexClient();
// => {
//    code: 200,
//    message: 'OK',
//    data: [
//        { code: 'eur', name: 'Euro' },
//        { code: 'usd', name: 'US Dollar' },
//        { code: 'cny', name: 'Chinese Yuan Renminbi' },
//        { code: 'btc', name: 'Bitcoin', }
//        ... More items
//    ]
// }
client.getCurrencies('latest');

// or
client.getCurrencies(new Date(2024, 11, 1));
```

| Parameter | Type                 | Optional | Default    | Description                                                         |
|-----------|----------------------|:--------:|------------|---------------------------------------------------------------------|
| `date`    | `Date` \| `"latest"` |   true   | `"latest"` | The date for fetching currencies, or `"latest"` for the most recent |
| `options` | `RequestInit`        |   true   | `{}`       | Additional request options                                          |

#### Returns: `Promise<HttpResponse<AvailableCurrency[]>>`

**Result Object:**

| Key       | Type                  | Required | Description                   |
|-----------|-----------------------|:--------:|-------------------------------|
| `code`    | `number`              |   true   | HTTP response status codes    |
| `message` | `string`              |   true   | HTTP response status messages |
| `data`    | `AvailableCurrency[]` |  false   | List of available currency    |

**interface AvailableCurrency:**

| Key    | Type     | Required | Description      |
|--------|----------|:--------:|------------------|
| `code` | `string` |   true   | Code of currency |
| `name` | `string` |  false   | Name of currency |

---

#### Methods: `getRates(code, date, options)`

Fetches the exchange rates for a specific currency.

```typescript
const client = new ForexClient();
// => {
//    code: 200,
//    message: 'OK',
//    data: [
//        { code: 'eur', rate: 100_000 },
//        { code: 'usd', rate: 100_000 },
//        { code: 'cny', rate: 100_000 },
//        ... More items
//    ]
// }
client.getRates('USD');

// or
client.getRates('US');
```

| Parameter | Type                 | Optional | Default                     | Description                                                         |
|-----------|----------------------|:--------:|-----------------------------|---------------------------------------------------------------------|
| `code`    | `string`             |   true   | `this.options.baseCurrency` | The currency code or locale code to get rates for                   |
| `date`    | `Date` \| `"latest"` |   true   | `"latest"`                  | The date for fetching currencies, or `"latest"` for the most recent |
| `options` | `RequestInit`        |   true   | `{}`                        | Additional request options                                          |

#### Returns: `Promise<HttpResponse<ExchangeRate[]>>`

**Result Object:**

| Key       | Type             | Required | Description                   |
|-----------|------------------|:--------:|-------------------------------|
| `code`    | `number`         |   true   | HTTP response status codes    |
| `message` | `string`         |   true   | HTTP response status messages |
| `data`    | `ExchangeRate[]` |  false   | List of exchange rates        |

**interface ExchangeRate:**

| Key    | Type     | Required | Description      |
|--------|----------|:--------:|------------------|
| `code` | `string` |   true   | Code of currency |
| `rate` | `number` |  false   | Rate of currency |

---

#### Methods: `getRate(baseCode, destCode, date, options)`

Fetches the exchange rate between two currencies.

```typescript
const client = new ForexClient();
// => {
//    code: 200,
//    message: 'OK',
//    data: 0.94759027
// }
client.getRate('USD', 'EUR');

// => {
//    code: 200,
//    message: 'OK',
//    data: 7.78004385
// }
client.getRate('US', 'HK');
```

| Parameter  | Type                 | Optional | Default                     | Description                                                         |
|------------|----------------------|:--------:|-----------------------------|---------------------------------------------------------------------|
| `baseCode` | `string`             |   true   | `this.options.baseCurrency` | The base currency code or locale code                               |
| `destCode` | `string`             |   true   | -                           | The destination currency code or locale code                        |
| `date`     | `Date` \| `"latest"` |   true   | `"latest"`                  | The date for fetching currencies, or `"latest"` for the most recent |
| `options`  | `RequestInit`        |   true   | `{}`                        | Additional request options                                          |

#### Returns: `Promise<HttpResponse<number>>`

**Result Object:**

| Key       | Type     | Required | Description                   |
|-----------|----------|:--------:|-------------------------------|
| `code`    | `number` |   true   | HTTP response status codes    |
| `message` | `string` |   true   | HTTP response status messages |
| `data`    | `number` |  false   | The exchange rate             |

---

#### Methods: `getCode(localeCode)`

Get a valid currency code based on ISO 3166-1 code.

```typescript
const client = new ForexClient();
// => 'USD'
client.getCode('US');

// => 'CNH'
client.getCode('HK');

// => 'CNY'
client.getCode('RMB');
```

| Parameter    | Type     | Optional | Default | Description                              |
|--------------|----------|:--------:|---------|------------------------------------------|
| `localeCode` | `string` |  false   | -       | The locale code to get currency code for |

#### Returns: `string`

The corresponding currency code.

---

#### Methods: `convert(baseCode, destCode, amount, date, options)`

Converts an amount from one currency to another.

```typescript
const client = new ForexClient();
// => {
//    code: 200,
//    message: 'OK',
//    data: 9.48
// }
client.convert('USD', 'EUR', 10);

// => {
//    code: 200,
//    message: 'OK',
//    data: 72.67
// }
client.convert('US', 'HK', 10);
```

| Parameter  | Type                 | Optional | Default                     | Description                                                         |
|------------|----------------------|:--------:|-----------------------------|---------------------------------------------------------------------|
| `baseCode` | `string`             |   true   | `this.options.baseCurrency` | The base currency code or locale code                               |
| `destCode` | `string`             |   true   | -                           | The destination currency code or locale code                        |
| `amount`   | `number`             |   true   | `0`                         | The amount to convert                                               |
| `date`     | `Date` \| `"latest"` |   true   | `"latest"`                  | The date for fetching currencies, or `"latest"` for the most recent |
| `options`  | `RequestInit`        |   true   | `{}`                        | Additional request options                                          |

#### Returns: `Promise<HttpResponse<number>>`

**Result Object:**

| Key       | Type     | Required | Description                   |
|-----------|----------|:--------:|-------------------------------|
| `code`    | `number` |   true   | HTTP response status codes    |
| `message` | `string` |   true   | HTTP response status messages |
| `data`    | `number` |  false   | The converted amount          |

## 🏅 Credits

- [exchange-api][exchange-api-url] - This package would not exist without this.

## 🔗 Related

- [forex-cli][forex-cli-url] - 💱 A Node.js Library to convert foreign exchange in terminal.

## 🤝 Contribution

Contributions via Pull Requests or [Issues][issues-url] are welcome.

## 📄 License

This project is licensed under the MIT License. See the [LICENSE][license-url] file for details.

[node-image]: https://img.shields.io/node/v/%40kabeep%2Fforex?color=lightseagreen
[node-url]: https://nodejs.org
[npm-image]: https://img.shields.io/npm/d18m/%40kabeep%2Fforex?color=cornflowerblue
[npm-url]: https://www.npmjs.com/package/@kabeep/forex
[codecov-image]: https://img.shields.io/codecov/c/github/kabeep/forex?logo=codecov&color=mediumvioletred
[codecov-url]: https://codecov.io/gh/kabeep/forex
[bundle-phobia-image]: https://img.shields.io/bundlephobia/minzip/@kabeep/forex
[bundle-phobia-url]: https://bundlephobia.com/package/@kabeep/forex
[circleci-image]: https://dl.circleci.com/status-badge/img/gh/kabeep/forex/tree/master.svg?style=shield
[circleci-url]: https://dl.circleci.com/status-badge/redirect/gh/kabeep/forex/tree/master
[insights-url]: https://repobeats.axiom.co/api/embed/1f8180692870dfd0a67e8cd0503bab7fb8f92223.svg "Repobeats analytics image"
[docs-url]: https://kabeep.github.io/forex
[demo-url]: https://kabeep.github.io/forex/documents/demo.html
[exchange-api-url]: https://github.com/fawazahmed0/exchange-api
[forex-cli-url]: https://github.com/kabeep/forex-cli
[issues-url]: https://github.com/kabeep/forex/issues
[license-image]: https://img.shields.io/github/license/kabeep/forex?color=slateblue
[license-url]: LICENSE
[en-us-url]: README.md
[zh-cn-url]: README.zh-CN.md
