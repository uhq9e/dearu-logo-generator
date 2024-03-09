export type CellSize = "s" | "l";

export type TextLanguage = "ja" | "zh";

export type Direction = "horizontal" | "vertical";

export type HorizontalAlignment = "left" | "center" | "right";

export type VerticalAlignment = "top" | "center" | "bottom";

export interface ICell {
  content: string;
  size: CellSize;
  highlight: boolean;
}

export interface IHighlightRange {
  line: 0 | 1;
  start: number;
  end: number;
}

export interface ILogoMeta {
  backgroundImage: string;
  outlineBoxColor: string;
  backgroundBoxColor: string;
  foregroundBoxColor: string;
  textColor: string;
  textHighlightColor: string;
  lineBeginOffset: [number, number];
  centerOffsetX: number;
  lineOrigLength: [number, number];
}

export interface ISize {
  width: number;
  height: number;
}

export interface IDrawLineConfig {
  xAlign?: HorizontalAlignment;
  yAlign?: VerticalAlignment;
  xOffset?: number;
  yOffset?: number;
}

export interface IBoundingBox {
  x1: number;
  y1: number;
  x2: number;
  y2: number;
}
