import { Cell, HighlightRange } from "./types/shared";
import { determineLanguage } from "./util";

export class GridBuilder {
  readonly auxiliariesJa = ["て", "に", "を", "は"];
  readonly auxiliariesZh = ["是", "的", "地", "得"];

  private grid?: Cell[][];

  constructor() {}

  private buildLine(line: string, highlight?: HighlightRange): Cell[] {
    let invertSize = false;
    let oldHighlighting: boolean | null = null;

    const lineLang = determineLanguage(line);

    let cells: Cell[] = [];

    Array.from(line).forEach((char, index) => {
      const highlighting = highlight
        ? index >= highlight.start && index <= highlight.end
        : false;

      const auxiliaries =
        lineLang === "ja" ? this.auxiliariesJa : this.auxiliariesZh;

      if (oldHighlighting !== null && highlighting !== oldHighlighting) {
        invertSize = !invertSize;
      } else {
        if (auxiliaries.includes(char) && index % 2 === Number(invertSize)) {
          if (index === line.length - 1 || index >= 4) {
            invertSize = !invertSize;
          }
        }
      }

      cells.push({
        content: char,
        size: index % 2 === Number(invertSize) ? "l" : "s",
        highlight: highlighting,
      });

      oldHighlighting = highlighting;
    });

    return cells;
  }

  public build(
    lines: [string, string],
    highlights: HighlightRange[] = [{ line: 1, start: 0, end: 1 }]
  ): Cell[][] {
    this.grid = lines.map((v, i) =>
      this.buildLine(
        v,
        highlights.find((h) => h.line === i)
      )
    );
    return this.grid;
  }
}
