# dearu-logo-generator

![hero](https://cdn.jsdelivr.net/gh/uhq9e/dearu-logo-generator/docs/images/hero.svg)

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

## TODO

- [x] NoWaYu
- [x] KuMeYu
- [ ] WaSuYu
- [ ] UHiMi
- [ ] YuYuYu
