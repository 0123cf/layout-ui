export const getUnit = (v: string) => {
    return v === parseFloat(v) + '' ? `${v}px` :
        v === 'auto' ? 'auto' :
        `calc(${v})`
}