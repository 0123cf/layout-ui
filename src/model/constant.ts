import { TRowAST } from '../types/index'
interface selectListItem {
    name?: string,
    className: string,
    src: string
}
export const layoutTypeList: selectListItem[] = [
    { src: '1', className: 'al-flex-spce-start' },
    { src: '2', className: 'al-flex-end-x' },
    { src: '3', className: 'al-flex-center-x' },
    { src: '4', className: 'al-flex-space-between-x' },
]
export const rowASTItemDefault: TRowAST = {
    tag: 'div',
    css: [],
    style: {
        width: 30,
        height: 30,
    },
    innerText: '',
    children: []
}