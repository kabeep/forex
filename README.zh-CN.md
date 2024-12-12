<div align="center">

<h1>forex</h1>

💱 一个 JavaScript 外汇库，通过 `fawazahmed0` 的 API。

[![NodeJS][node-image]][node-url]
[![License][license-image]][license-url]
[![NPM][npm-image]][npm-url]
[![Codecov][codecov-image]][codecov-url]
[![BundlePhobia][bundle-phobia-image]][bundle-phobia-url]
[![CircleCI][circleci-image]][circleci-url]

[English][en-us-url] | 简体中文

![Insights][insights-url]

</div>

## 📖 简介

> `forex` 全称是 `Foreign Exchange`，它的目的不是用于 `FX` 外汇交易，请慎重用于投资相关决策。

在浏览器或终端中获取每日汇率，免费且无速率限制。

查看 [文档][docs-url] 或 [在线示例][demo-url]。

## ⚙️ 安装

```bash
npm install @kabeep/forex --save
```

```bash
yarn add @kabeep/forex
```

```bash
pnpm add @kabeep/forex
```

## 🚀 使用

**CommonJS**

```typescript
const { ForexClient, ForexClientOptions } = require('@kabeep/forex');

const client = new Clinet({} as ForexClientOptions);
```

**ESModule**

```typescript
import { ForexClient, type ForexClientOptions } from '@kabeep/forex';

const client = new Clinet({} as ForexClientOptions);
```

**接口 `ForexClientOptions`:**

| 参数             | 类型            |  可选  | 默认值    | 描述             |
|----------------|---------------|:----:|--------|----------------|
| `baseCurrency` | `string`      | true | -      | 基准货币代码         |
| `minified`     | `boolean`     | true | `true` | 请求压缩过的 JSON 数据 |
| `timeout`      | `number`      | true | `5000` | 请求超时时间 (毫秒)    |
| `headers`      | `HeadersInit` | true | `{}`   | 请求头            |

#### 函数: `getCurrencies(date, options)`

获取可用的货币列表。

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

| 参数        | 类型                   |  可选  | 默认值        | 描述                    |
|-----------|----------------------|:----:|------------|-----------------------|
| `date`    | `Date` \| `"latest"` | true | `"latest"` | 获取货币的日期，或最新的 'latest' |
| `options` | `RequestInit`        | true | `{}`       | 自定义请求参数               |

**返回: `Promise<HttpResponse<AvailableCurrency[]>>`**

| 属性        | 类型                    |  必选   | 描述          |
|-----------|-----------------------|:-----:|-------------|
| `code`    | `number`              | true  | HTTP 响应状态代码 |
| `message` | `string`              | true  | HTTP 响应状态消息 |
| `data`    | `AvailableCurrency[]` | false | 可用货币列表      |

**接口: `AvailableCurrency`**

| 属性     | 类型       |  必选   | 描述   |
|--------|----------|:-----:|------|
| `code` | `string` | true  | 货币代码 |
| `name` | `string` | false | 货币名称 |

---

#### 函数: `getRates(code, date, options)`

获取指定货币的汇率。

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

| 参数        | 类型                   |  可选  | 默认值                         | 描述                    |
|-----------|----------------------|:----:|-----------------------------|-----------------------|
| `code`    | `string`             | true | `this.options.baseCurrency` | 用于获取汇率的货币代码或区域代码      |
| `date`    | `Date` \| `"latest"` | true | `"latest"`                  | 获取货币的日期，或最新的 'latest' |
| `options` | `RequestInit`        | true | `{}`                        | 	自定义请求参数              |

**返回: `Promise<HttpResponse<ExchangeRate[]>>`**

| 属性        | 类型               |  必选   | 描述          |
|-----------|------------------|:-----:|-------------|
| `code`    | `number`         | true  | HTTP 响应状态代码 |
| `message` | `string`         | true  | HTTP 响应状态消息 |
| `data`    | `ExchangeRate[]` | false | 汇率列表        |

**接口: `ExchangeRate`**

| 属性     | 类型       |  必选   | 描述   |
|--------|----------|:-----:|------|
| `code` | `string` | true  | 货币代码 |
| `rate` | `number` | false | 货币汇率 |

---

#### 函数: `getRate(baseCode, destCode, date, options)`

获取两种货币之间的汇率。

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

| 参数         | 类型                   |  可选  | 默认值                         | 描述                    |
|------------|----------------------|:----:|-----------------------------|-----------------------|
| `baseCode` | `string`             | true | `this.options.baseCurrency` | 基准货币代码或区域代码           |
| `destCode` | `string`             | true | -                           | 目标货币代码或区域代码           |
| `date`     | `Date` \| `"latest"` | true | `"latest"`                  | 获取货币的日期，或最新的 'latest' |
| `options`  | `RequestInit`        | true | `{}`                        | 自定义请求参数               |

**返回: `Promise<HttpResponse<number>>`**

| 属性        | 类型       |  必选   | 描述          |
|-----------|----------|:-----:|-------------|
| `code`    | `number` | true  | HTTP 响应状态代码 |
| `message` | `string` | true  | HTTP 响应状态消息 |
| `data`    | `number` | false | 汇率          |

---

#### 函数: `getCode(localeCode)`

根据 ISO 3166-1 代码获取有效的货币代码。

```typescript
const client = new ForexClient();
// => 'USD'
client.getCode('US');

// => 'CNH'
client.getCode('HK');

// => 'CNY'
client.getCode('RMB');
```

| 参数           | 类型       |  可选   | 默认值 | 描述                        |
|--------------|----------|:-----:|-----|---------------------------|
| `localeCode` | `string` | false | -   | `用于获取货币代码的 ISO 3166-1 代码` |

**返回: `string`**

对应的货币代码。

---

#### 函数: `convert(baseCode, destCode, amount, date, options)`

将金额从一种货币转换为另一种货币。

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

| 参数         | 类型                   |  可选  | 默认值                         | 描述                    |
|------------|----------------------|:----:|-----------------------------|-----------------------|
| `baseCode` | `string`             | true | `this.options.baseCurrency` | 基准货币代码或区域代码           |
| `destCode` | `string`             | true | -                           | 目标货币代码或区域代码           |
| `amount`   | `number`             | true | `0`                         | 兑换数额                  |
| `date`     | `Date` \| `"latest"` | true | `"latest"`                  | 获取货币的日期，或最新的 'latest' |
| `options`  | `RequestInit`        | true | `{}`                        | 	自定义请求参数              |

**返回: `Promise<HttpResponse<number>>`**

| 属性        | 类型       |  必选   | 描述          |
|-----------|----------|:-----:|-------------|
| `code`    | `number` | true  | HTTP 响应状态代码 |
| `message` | `string` | true  | HTTP 响应状态消息 |
| `data`    | `number` | false | 兑换金额        |

## 🏅 致谢

- [exchange-api][exchange-api-url] - 如果没有这个，这个包就不会存在。

## 🔗 关联库

- [forex-cli][forex-cli-url] - 💱 用于在终端中转换外汇的 Node.js 库。

## 🤝 贡献

欢迎通过 Pull Requests 或 [Issues][issues-url] 来贡献你的想法和代码。

## 📄 许可

本项目采用 MIT 许可证。详情请见 [LICENSE][license-url] 文件。

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
[docs-url]: https://kabeep.github.io/forex/documents/____.html
[demo-url]: https://kabeep.github.io/forex/documents/demo.html
[exchange-api-url]: https://github.com/fawazahmed0/exchange-api
[forex-cli-url]: https://github.com/kabeep/forex-cli
[issues-url]: https://github.com/kabeep/forex/issues
[license-image]: https://img.shields.io/github/license/kabeep/forex?color=slateblue
[license-url]: LICENSE
[en-us-url]: README.md
[zh-cn-url]: README.zh-CN.md
