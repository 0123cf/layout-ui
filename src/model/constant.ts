interface selectListItem {
    name: string,
    className: string
}
export const layoutTypeList: selectListItem[] = [
    { name: 'space', className: 'al-flex-spce-x' },
    { name: 'row', className: 'al-flex-row' },
    { name: 'column', className: 'al-flex-col' },
]