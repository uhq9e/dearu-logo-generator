declare module "*.png" {
  const value: string;
  export default value;
}

declare module "*.otf" {
  const value: string;
  export default value;
}

declare module "*.svg" {
  const value: string;
  export default value;
}

type CellSize = "s" | "l";

type TextLanguage = "ja" | "zh";

type Direction = "horizontal" | "vertical";

type HorizontalAlignment = "left" | "center" | "right";

type VerticalAlignment = "top" | "center" | "bottom";

interface Cell {
  content: string;
  size: CellSize;
  highlight: boolean;
}

interface HighlightRange {
  line: 0 | 1;
  start: number;
  end: number;
}

interface LogoMeta {
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

interface Size {
  width: number;
  height: number;
}

interface DrawLineConfig {
  xAlign?: HorizontalAlignment;
  yAlign?: VerticalAlignment;
  xOffset?: number;
  yOffset?: number;
}
