import { Size, TextLanguage } from "./types/shared";

import { BoundingBox } from "opentype.js";

const jaRegex = /[ぁ-ヿ]/g;

export function bulkSetAttributes(
  element: Element,
  attributes: Record<string, string | number>
): Element {
  for (const [key, value] of Object.entries(attributes)) {
    element.setAttribute(key, value.toString());
  }
  return element;
}

export function calcGlyphSize(boundingBox: BoundingBox): Size {
  return {
    width: boundingBox.x2 - boundingBox.x1,
    height: boundingBox.y2 - boundingBox.y1,
  };
}

export function isSpace(text: string): boolean {
  return text === " " || text === "　";
}

export function determineLanguage(text: string): TextLanguage {
  if (jaRegex.exec(text)) {
    return "ja";
  }
  return "zh";
}

export function isBrowser(): boolean {
  return typeof window !== "undefined";
}
