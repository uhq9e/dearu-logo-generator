import { LogoMeta, Direction, HighlightRange } from "./types/shared";
import { Font } from "opentype.js";
/**
 * Logo Generator main class
 */
export declare class LogoGenerator {
    readonly origWidth = 1280;
    readonly origHeight = 720;
    readonly largeCellSize = 132;
    readonly smallCellSize: number;
    readonly backgroundBoxRadius = 8;
    readonly backgroundStrokeWidth = 7;
    readonly spacing = 12;
    readonly lineSpacing = 4;
    readonly lineMaxLength: number[];
    private document;
    width: number;
    height: number;
    meta: LogoMeta;
    direction: Direction;
    fonts: Map<string, Font>;
    constructor(meta?: LogoMeta, direction?: Direction);
    /**
     * Set the meta information for the logo.
     *
     * @param {LogoMeta} meta - the meta information to set
     * @return {this} the current instance for method chaining
     */
    setMeta(meta: LogoMeta): this;
    /**
     * Set the direction of the logo.
     *
     * @param {Direction} direction - the direction to set
     * @return {this} the current instance for method chaining
     */
    setDirection(direction: Direction): this;
    private getCellSize;
    private calcLineWidth;
    private calcLineHeight;
    private calcLinesHeight;
    private loadFont;
    private drawBackground;
    private drawChar;
    private drawLine;
    /**
     * Generate an SVG element containing the logo based on the input lines and highlights.
     *
     * @param {string} firstLine - the first line of text
     * @param {string} secondLine - the second line of text
     * @param {HighlightRange[]} [highlights] - array of highlight ranges
     * @param {boolean} [center=false] - whether to center the text
     * @return {Promise<SVGSVGElement>} a Promise that resolves to the generated SVG element
     */
    generate(firstLine: string, secondLine: string, highlights?: HighlightRange[], center?: boolean): Promise<SVGSVGElement>;
}
