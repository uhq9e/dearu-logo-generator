import { babel } from "@rollup/plugin-babel";
import typescript from "@rollup/plugin-typescript";
import url from "@rollup/plugin-url";
import { nodeResolve } from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";
import json from "@rollup/plugin-json";

import createBanner from "create-banner";

import pkg from "./package.json" assert { type: "json" };

const banner = createBanner({
  data: {
    name: `${pkg.name}`,
    year: "2024-present",
  },
});

export default {
  input: "src/index.ts",
  output: [
    {
      banner,
      name: pkg.name,
      file: `dist/${pkg.name}.js`,
      format: "umd",
    },
    {
      banner,
      file: `dist/${pkg.name}.common.js`,
      format: "cjs",
      exports: "auto",
    },
    {
      banner,
      file: `dist/${pkg.name}.esm.js`,
      format: "esm",
    },
    {
      banner,
      name: pkg.name,
      file: `docs/js/${pkg.name}.js`,
      format: "umd",
    },
  ],
  plugins: [
    babel({
      babelHelpers: "bundled",
    }),
    url({
      include: ["**/*.png", "**/*.otf", "**/*.svg"],
      limit: Infinity,
    }),
    json(),
    commonjs(),
    nodeResolve(),
    typescript(),
  ],
};
