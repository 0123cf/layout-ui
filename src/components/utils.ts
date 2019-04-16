interface TRowAST {
    tag: string,
    css: string[],
    style: any [],
    innerText?: string
}

let createTag = (item: TRowAST, inner?: string): string => {
    let cssStr:string = item.css.length > 0 ? ` class="${item.css.join(' ')}"`
        : ''
    return `<${item.tag}${cssStr}>${
        inner || ''
    }</${item.tag}>`
}

export const createHtml = (rowInfo:TRowAST, rowAst: TRowAST[]) => {
    let view: string, debugView: string
    view = createTag(
        rowInfo,
        rowAst.map(item => {
            return createTag(item, item.innerText)
        }).join('')
    )
    debugView = createTag(
        rowInfo,
        rowAst.map(item => {
            return createTag(item, '')
        }).join('')
    )
    return {view, debugView}
}