import { ISize, TextLanguage } from "./types/shared";
import { BoundingBox } from "opentype.js";
export declare function bulkSetAttributes(element: Element, attributes: Record<string, string | number>): Element;
export declare function calcGlyphSize(boundingBox: BoundingBox): ISize;
export declare function isSpace(text: string): boolean;
export declare function determineLanguage(text: string): TextLanguage;
export declare function isBrowser(): boolean;
