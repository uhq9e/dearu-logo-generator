import { parse, Font } from "opentype.js";
import { parseHTML } from "linkedom";

import { GridBuilder } from "./grid.js";
import { nowayu } from "./logometa.js";
import { bulkSetAttributes, isSpace, isBrowser } from "./util.js";

import LogoFont from "../assets/fonts/logo_regular.otf";

const ns = "http://www.w3.org/2000/svg";

if (!isBrowser()) {
  const w = parseHTML("<div></div>");
  var document = w.document;
}

export class LogoGenerator {
  readonly origWidth = 1280;
  readonly origHeight = 720;

  readonly largeCellSize = 132;
  readonly smallCellSize = this.largeCellSize * 0.87;

  readonly backgroundBoxRadius = 8;
  readonly backgroundStrokeWidth = 6;

  readonly spacing = 12;
  readonly lineSpacing = 4;

  readonly lineMaxLength = [6, 5];

  width: number;
  height: number;

  meta: LogoMeta;
  direction: Direction;
  fonts: Map<string, Font> = new Map();

  constructor(meta: LogoMeta = nowayu, direction: Direction = "horizontal") {
    this.meta = meta;
    this.direction = direction;

    if (direction === "vertical") {
      this.width = this.origHeight;
      this.height = this.origWidth;
    } else {
      this.width = this.origWidth;
      this.height = this.origHeight;
    }
  }

  private async loadFont(url: string): Promise<Font> {
    if (this.fonts.has(url)) {
      return this.fonts.get(url)!;
    }

    const buffer = await fetch(url).then((res) => res.arrayBuffer());
    const font = parse(buffer);
    this.fonts.set(url, font);
    return font;
  }

  public setMeta(meta: LogoMeta) {
    this.meta = meta;
  }

  private getCellSize(cell: Cell) {
    if (isSpace(cell.content)) {
      return this.spacing * 2;
    }

    return cell.size === "s" ? this.smallCellSize : this.largeCellSize;
  }

  private calcLineWidth(
    cells: Cell[],
    withEndSpacing: boolean = false
  ): number {
    return cells
      .map(
        (cell, i, arr) =>
          this.getCellSize(cell) +
          (i === arr.length - 1
            ? withEndSpacing
              ? this.spacing
              : 0
            : this.spacing)
      )
      .reduce((a, b) => a + b, 0);
  }

  private calcLineHeight(cells: Cell[]): number {
    return cells.reduce((a, b) => {
      const size = this.getCellSize(b);
      return size > a ? size : a;
    }, 0);
  }

  private calcLinesHeight(lines: Cell[][]): number {
    return lines
      .map(
        (line, i, arr) =>
          this.calcLineHeight(line) +
          (i === arr.length - 1 ? 0 : this.lineSpacing)
      )
      .reduce((a, b) => a + b, 0);
  }

  private drawBackground(imgUri: string): SVGImageElement {
    const image = document.createElementNS(ns, "image");
    bulkSetAttributes(image, {
      x: 0,
      y: this.direction === "vertical" ? -this.width : 0,
      width: this.origWidth,
      height: this.origHeight,
      href: imgUri,
      transform: this.direction === "vertical" ? `rotate(90)` : "",
    });

    return image;
  }

  private drawChar(
    x: number,
    y: number,
    text: string,
    font: Font,
    fontSize: number
  ): SVGPathElement {
    const glyph = font.charToGlyph(text);
    const path = glyph.getPath(x, y, fontSize);
    const pathData = path.toPathData(2);

    const pathElem = document.createElementNS(ns, "path");
    pathElem.setAttribute("d", pathData);

    return pathElem;
  }

  private drawLine(
    x: number,
    y: number,
    cells: Cell[],
    font: Font,
    cfg?: DrawLineConfig
  ): SVGGElement {
    switch (cfg?.xAlign) {
      case "left":
        break;

      case "center":
        x -= this.calcLineWidth(cells) / 2;
        break;

      case "right":
        x -= this.calcLineWidth(cells);
        break;
    }

    switch (cfg?.yAlign) {
      case "top":
        break;

      case "center":
        y -= this.largeCellSize / 2;
        break;

      case "bottom":
        y -= this.largeCellSize;
        break;
    }

    if (cfg?.xOffset) x += cfg.xOffset;
    if (cfg?.yOffset) y += cfg.yOffset;

    const yBaseline = this.largeCellSize / 2;
    const group = document.createElementNS(ns, "g");

    for (const cell of cells) {
      if (isSpace(cell.content)) {
        x += this.spacing * 2;
        continue;
      }

      const size = cell.size === "s" ? this.smallCellSize : this.largeCellSize;
      const fontSize = size * (cell.highlight ? 0.95 : 0.8);
      const textOffsetY = size * (cell.highlight ? 0.14 : 0.2);

      const yOffset = y + (yBaseline - size / 2);

      const proxyX = this.direction === "vertical" ? yOffset : x;
      const proxyY = this.direction === "vertical" ? x : yOffset;
      console.log(proxyX, proxyY);

      const charGroup = document.createElementNS(ns, "g");

      const foregroundBoxOutline = document.createElementNS(ns, "rect");
      bulkSetAttributes(foregroundBoxOutline, {
        x: proxyX,
        y: proxyY,
        width: size,
        height: size,
        fill: "none",
        stroke: "white",
        "stroke-width": this.backgroundStrokeWidth,
        rx: this.backgroundBoxRadius,
        ry: this.backgroundBoxRadius,
      });

      const foregroundBox = document.createElementNS(ns, "rect");
      bulkSetAttributes(foregroundBox, {
        x: proxyX,
        y: proxyY,
        width: size,
        height: size,
        fill: cell.highlight
          ? this.meta.backgroundBoxColor
          : this.meta.foregroundBoxColor,
        rx: this.backgroundBoxRadius,
        ry: this.backgroundBoxRadius,
      });

      const backgroundBoxOutline = document.createElementNS(ns, "rect");
      bulkSetAttributes(backgroundBoxOutline, {
        x: proxyX + this.backgroundStrokeWidth / 2,
        y: proxyY + this.backgroundStrokeWidth / 2,
        width: size - this.backgroundStrokeWidth,
        height: size - this.backgroundStrokeWidth,
        fill: "none",
        stroke: "white",
        "stroke-width": this.backgroundStrokeWidth * 2,
        rx: this.backgroundBoxRadius,
        ry: this.backgroundBoxRadius,
      });

      const backgroundBox = document.createElementNS(ns, "rect");
      bulkSetAttributes(backgroundBox, {
        x: proxyX + this.backgroundStrokeWidth / 2,
        y: proxyY + this.backgroundStrokeWidth / 2,
        width: size - this.backgroundStrokeWidth,
        height: size - this.backgroundStrokeWidth,
        fill: "none",
        stroke: this.meta.backgroundBoxColor,
        "stroke-width": this.backgroundStrokeWidth,
        rx: this.backgroundBoxRadius,
        ry: this.backgroundBoxRadius,
      });

      !cell.highlight || charGroup.appendChild(foregroundBoxOutline);
      charGroup.appendChild(foregroundBox);
      cell.highlight || charGroup.appendChild(backgroundBoxOutline);
      cell.highlight || charGroup.appendChild(backgroundBox);

      const charX = proxyX + size / 2 - fontSize / 2;
      const charY = proxyY + size - textOffsetY;

      const charOutline = this.drawChar(
        charX,
        charY,
        cell.content,
        font,
        fontSize
      );
      bulkSetAttributes(charOutline, {
        fill: "none",
        stroke: "white",
        "stroke-width": this.backgroundStrokeWidth,
      });

      cell.highlight || charGroup.appendChild(charOutline);

      const char = this.drawChar(charX, charY, cell.content, font, fontSize);
      char.setAttribute(
        "fill",
        cell.highlight ? this.meta.textHighlightColor : this.meta.textColor
      );

      charGroup.appendChild(char);

      group.appendChild(charGroup);

      x += size + this.spacing;
    }

    return group;
  }

  public async generate(
    firstLine: string,
    secondLine: string,
    highlights?: HighlightRange[],
    center: boolean = false
  ): Promise<SVGSVGElement> {
    const builder = new GridBuilder();
    const lines = builder.build([firstLine, secondLine], highlights);

    const font = await this.loadFont(LogoFont);

    const svg = document.createElementNS(ns, "svg");
    bulkSetAttributes(svg, {
      viewBox: `0 0 ${this.width} ${this.height}`,
    });

    svg.appendChild(this.drawBackground(this.meta.backgroundImage));

    let y = this.origHeight / 2 - this.calcLinesHeight(lines) / 2;
    for (const i in lines) {
      let x = center
        ? this.origWidth * this.meta.centerOffsetX
        : this.origWidth * this.meta.lineBeginOffset[i];
      const proxyY =
        this.direction === "vertical"
          ? Math.abs(this.origHeight - y - this.largeCellSize)
          : y;

      if (lines[i].length > this.lineMaxLength[i] && !center) {
        x -= this.calcLineWidth(
          lines[i].slice(
            0,
            Math.round((lines[i].length - this.lineMaxLength[i]) / 2)
          ),
          true
        );
      }

      if (lines[i].length < this.meta.lineOrigLength[i] && !center) {
        x +=
          (this.meta.lineOrigLength[i] - lines[i].length) *
          (this.smallCellSize / 3);
      }

      svg.appendChild(
        this.drawLine(x, proxyY, lines[i], font, {
          xAlign: center ? "center" : "left",
          yOffset: 6,
        })
      );

      y += this.calcLineHeight(lines[i]);
      y += this.lineSpacing;
    }

    return svg;
  }
}
