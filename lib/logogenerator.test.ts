import { describe, expect, test } from "@jest/globals";
import { LogoGenerator } from "./logogenerator";
import { nowayu } from "./logometa";

describe("LogoGenerator", () => {
  test("svg generates correctly", async () => {
    const generator = new LogoGenerator(nowayu, "horizontal");
    expect(
      (
        await generator.generate("乃木若葉は", "勇者である", [
          { line: 1, start: 0, end: 1 },
        ])
      ).outerHTML
    ).toMatchSnapshot();
  });
});
