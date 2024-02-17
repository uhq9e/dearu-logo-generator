import { describe, expect, test } from "@jest/globals";
import { GridBuilder } from "./grid";

describe("GridBuilder", () => {
  test("build", () => {
    const grid = new GridBuilder().build(
      ["乃木若葉は", "勇者である"],
      [{ line: 1, start: 0, end: 1 }]
    );
    expect(grid).toEqual([
      [
        { content: "乃", size: "l", highlight: false },
        { content: "木", size: "s", highlight: false },
        { content: "若", size: "l", highlight: false },
        { content: "葉", size: "s", highlight: false },
        { content: "は", size: "s", highlight: false },
      ],
      [
        { content: "勇", size: "l", highlight: true },
        { content: "者", size: "s", highlight: true },
        { content: "で", size: "s", highlight: false },
        { content: "あ", size: "l", highlight: false },
        { content: "る", size: "s", highlight: false },
      ],
    ]);
  });
});
