import { Cell, HighlightRange } from "./types/shared";
export declare class GridBuilder {
    readonly auxiliariesJa: string[];
    readonly auxiliariesZh: string[];
    private grid?;
    constructor();
    private buildLine;
    build(lines: [string, string], highlights?: HighlightRange[]): Cell[][];
}
