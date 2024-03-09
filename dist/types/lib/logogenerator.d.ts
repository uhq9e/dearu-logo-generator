import { ILogoMeta, Direction, IHighlightRange } from "./types/shared";
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
    readonly bleeding = 32;
    private document;
    width: number;
    height: number;
    private meta;
    private direction;
    private fonts;
    constructor(meta?: ILogoMeta, direction?: Direction);
    /**
     * Set the meta information for the logo.
     *
     * @param {ILogoMeta} meta - the meta information to set
     * @return {this} the current instance for method chaining
     */
    setMeta(meta: ILogoMeta): this;
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
    private calcCellsBBox;
    private loadFont;
    private drawBackground;
    private drawChar;
    private drawLine;
    /**
     * Generate an SVG element containing the logo based on the input lines and highlights.
     *
     * @param {string} firstLine - the first line of text
     * @param {string} secondLine - the second line of text
     * @param {IHighlightRange[]} [highlights] - array of highlight ranges
     * @param {boolean} [center=false] - whether to center the text
     * @return {Promise<SVGSVGElement>} a Promise that resolves to the generated SVG element
     */
    generate(firstLine: string, secondLine: string, highlights?: IHighlightRange[], center?: boolean, allowOverflow?: boolean): Promise<SVGSVGElement>;
}
