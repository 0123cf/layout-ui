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
    let html: string
    html = createTag(
        rowInfo,
        rowAst.map(item => {
            return createTag(item, item.innerText)
        }).join('')
    )
    return html
}