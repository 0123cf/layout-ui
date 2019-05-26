import { TRowAST } from '../types/index'
interface selectListItem {
    name?: string,
    className: string,
    src: string
}
export const layoutTypeList: selectListItem[] = [
    { src: 'svg/flex-row-x.svg', className: 'al-flex-spce-start' },
    { src: 'svg/flex-row-x-r.svg', className: 'al-flex-end-x' },
    { src: 'svg/flex-center-x.svg', className: 'al-flex-center-x' },
    { src: 'svg/flex-space-x.svg', className: 'al-flex-space-between-x' },
]
export const rowASTItemDefault: TRowAST = {
    tag: 'div',
    css: [],
    style: {
        width: '30px',
        height: '30px',
    },
    innerText: '',
    children: []
}
export const projectAstListData: string = 'projectAstListData'
export const docco: any = {"hljs":{"display":"block","overflowX":"auto","padding":"0.5em","color":"#000","background":"#f8f8ff"},"hljs-comment":{"color":"#408080","fontStyle":"italic"},"hljs-quote":{"color":"#408080","fontStyle":"italic"},"hljs-keyword":{"color":"#954121"},"hljs-selector-tag":{"color":"#954121"},"hljs-literal":{"color":"#954121"},"hljs-subst":{"color":"#954121"},"hljs-number":{"color":"#40a070"},"hljs-string":{"color":"#219161"},"hljs-doctag":{"color":"#219161"},"hljs-selector-id":{"color":"#19469d"},"hljs-selector-class":{"color":"#19469d"},"hljs-section":{"color":"#19469d"},"hljs-type":{"color":"#19469d"},"hljs-params":{"color":"#00f"},"hljs-title":{"color":"#458","fontWeight":"bold"},"hljs-tag":{"color":"#000080","fontWeight":"normal"},"hljs-name":{"color":"#000080","fontWeight":"normal"},"hljs-attribute":{"color":"#000080","fontWeight":"normal"},"hljs-variable":{"color":"#008080"},"hljs-template-variable":{"color":"#008080"},"hljs-regexp":{"color":"#b68"},"hljs-link":{"color":"#b68"},"hljs-symbol":{"color":"#990073"},"hljs-bullet":{"color":"#990073"},"hljs-built_in":{"color":"#0086b3"},"hljs-builtin-name":{"color":"#0086b3"},"hljs-meta":{"color":"#999","fontWeight":"bold"},"hljs-deletion":{"background":"#fdd"},"hljs-addition":{"background":"#dfd"},"hljs-emphasis":{"fontStyle":"italic"},"hljs-strong":{"fontWeight":"bold"}}
export const defaultRowNumber = 3