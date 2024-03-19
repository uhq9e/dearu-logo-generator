import { ICell, IHighlightRange } from "./types/shared";
import { determineLanguage } from "./util";

export class GridBuilder {
  readonly auxiliariesJa = ["て", "に", "を", "は"];
  readonly auxiliariesZh = ["是", "的", "地", "得"];

  private grid?: ICell[][];

  constructor() {}

  private buildLine(line: string, highlights: IHighlightRange[] = []): ICell[] {
    let invertSize = false;
    let oldHighlighting: boolean | null = null;

    const lineLang = determineLanguage(line);

    let cells: ICell[] = [];

    Array.from(line).forEach((char, index) => {
      const highlighting = highlights.some(
        (hl) => index >= hl.start && index <= hl.end
      );

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
    highlights: IHighlightRange[] = [{ line: 1, start: 0, end: 1 }]
  ): ICell[][] {
    this.grid = lines.map((v, i) =>
      this.buildLine(
        v,
        highlights.filter((h) => h.line === i)
      )
    );
    return this.grid;
  }
}
