import { babel } from "@rollup/plugin-babel";
import typescript from "@rollup/plugin-typescript";
import url from "@rollup/plugin-url";
import { nodeResolve } from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";
import json from "@rollup/plugin-json";
import terser from "@rollup/plugin-terser";

import createBanner from "create-banner";

import pkg from "./package.json" assert { type: "json" };

const banner = createBanner({
  data: {
    name: `${pkg.name}`,
    year: "2024-present",
  },
});

export default {
  input: "lib/index.ts",
  output: [
    {
      banner,
      name: pkg.name,
      file: `dist/${pkg.name}.js`,
      format: "umd",
    },
    {
      banner,
      name: pkg.name,
      file: `dist/${pkg.name}.min.js`,
      format: "umd",
      plugins: [terser()],
    },
    {
      banner,
      file: `dist/${pkg.name}.common.js`,
      format: "cjs",
      exports: "auto",
    },
    {
      banner,
      file: `dist/${pkg.name}.common.min.js`,
      format: "cjs",
      exports: "auto",
      plugins: [terser()],
    },
    {
      banner,
      file: `dist/${pkg.name}.esm.js`,
      format: "esm",
    },
    {
      banner,
      file: `dist/${pkg.name}.esm.min.js`,
      format: "esm",
      plugins: [terser()],
    },
  ],
  plugins: [
    commonjs(),
    babel({
      babelHelpers: "bundled",
    }),
    url({
      include: ["**/*.png", "**/*.otf", "**/*.svg"],
      limit: Infinity,
    }),
    json(),
    nodeResolve(),
    typescript(),
  ],
};
