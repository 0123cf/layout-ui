export interface TRowAST {
    tag: string,
    css: string[],
    style: any,
    innerText?: string,
    children: TRowAST[]
}

export interface Tstore {
    previewHTML: string,
    previewAST: TRowAST[],
    selectRowPath: number[],
}