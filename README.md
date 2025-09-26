# dearu-logo-generator

![hero](https://wkck-tools-web.vercel.app/api/logo-generator?series=nowayu&text1=%E5%8B%87%E8%80%85%E3%81%A7%E3%81%82%E3%82%8B%E3%82%B7%E3%83%AA%E3%83%BC%E3%82%BA&text2=%E3%83%AD%E3%82%B4%E3%82%B8%E3%82%A7%E3%83%8D%E3%83%AC%E3%83%BC%E3%82%BF%E3%83%BC&format=svg)

A _Yuusha de Aru series (勇者であるシリーズ)_ logo generator library for Node.js and browsers.

## Install

```shell
npm i dearu-logo-generator
```

## Usage

```javascript
import { LogoGenerator, nowayu } from "dearu-logo-generator";

// or

const { LogoGenerator, nowayu } = require("dearu-logo-generator");
```

```javascript
const lg = new LogoGenerator(nowayu, "horizontal");

const svg = lg.generate(
  "乃木若葉は",
  "勇者である",
  [{ line: 1, start: 0, end: 1 }],
  false
);

console.log(svg.outerHTML); // <svg viewBox="0 0 1280 720" xmlns=...
```

## Current Supported Logo

- [x] NoWaYu
- [x] KuMeYu
- [x] WaSuYu
- [x] UHiMi
- [x] YuYuYu
