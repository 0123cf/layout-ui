interface TRowAST {
    tag: string,
    css: string[],
    style: any [],
    innerText?: string,
    children: TRowAST[]
}
interface TcreaterHtml {
    view: string
}

let createTag = (item: TRowAST, inner?: string): string => {
    let cssStr:string = item.css.length > 0 ? ` class="${item.css.join(' ')}"`
        : ''
    let childrenHtml:string 
    if(item.children.length > 0){
        childrenHtml = item.children.map(item => {
            return createTag(item, item.innerText)
        }).join('')
    }else{
        childrenHtml = inner || ''
    }
    return `<${item.tag}${cssStr}>${childrenHtml}</${item.tag}>`
}

export const createHtml = (rowInfo: TRowAST[]): TcreaterHtml => {
    let view: string = rowInfo.map(item => {
        return createTag(item, item.innerText)
    }).join('')
    return {view}
}