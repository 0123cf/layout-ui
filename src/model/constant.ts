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