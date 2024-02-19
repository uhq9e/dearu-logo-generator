export type CellSize = "s" | "l";

export type TextLanguage = "ja" | "zh";

export type Direction = "horizontal" | "vertical";

export type HorizontalAlignment = "left" | "center" | "right";

export type VerticalAlignment = "top" | "center" | "bottom";

export interface Cell {
  content: string;
  size: CellSize;
  highlight: boolean;
}

export interface HighlightRange {
  line: 0 | 1;
  start: number;
  end: number;
}

export interface LogoMeta {
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

export interface Size {
  width: number;
  height: number;
}

export interface DrawLineConfig {
  xAlign?: HorizontalAlignment;
  yAlign?: VerticalAlignment;
  xOffset?: number;
  yOffset?: number;
}
