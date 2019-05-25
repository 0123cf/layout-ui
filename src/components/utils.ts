import { TRowAST } from '../types/index'

interface TcreaterHtml {
    view: string
}
interface TsetTreeData {
    path: number[],
    value: any,
    childrenName: string
}
interface TdelectTreeData {
    path: number[],
    childrenName: string
}
var getSTyleStr = (o: any): string => {
    var str = ""
    for (let e of Object.keys(o)) {
        let key = e
        key = key.replace(/([A-Z])/g, "-$1").toLowerCase()
        str += `${key}: ${o[e]};`
    }
    return str
}

let createTag = (item: TRowAST, inner?: string): string => {
    let cssStr: string = item.css.length > 0 ? ` class="${item.css.join(' ')}"`
        : ''
    let styleStr: string = getSTyleStr(item.style)
    let childrenHtml: string
    if (item.children.length > 0) {
        childrenHtml = item.children.map(item => {
            return createTag(item, item.innerText)
        }).join('')
    } else {
        childrenHtml = inner || ''
    }
    return `<${item.tag}${cssStr} style="${styleStr}">${childrenHtml}</${item.tag}>`
}
export const Copy = <T>(o: T): T => JSON.parse(JSON.stringify(o))
export const createHtml = (rowInfo: TRowAST[]): TcreaterHtml => {
    let view: string = rowInfo.map(item => {
        return createTag(item, item.innerText)
    }).join('')
    return { view }
}
export const getTreeVal = <T>(_object: T, key: string): any => {
    if (typeof _object !== typeof {}) {
        new Error('params error')
        return _object
    }
    let copy = (e: any) => JSON.parse(JSON.stringify(e))
    let keys = key.split('.')
    let objecChildren
    for (let e of keys) {
        objecChildren = copy(objecChildren || _object)[e]
    }
    return objecChildren
}
const id = <T>(_: T): T => _
export const filterTree = (data: any[], childrenName: string, id: any): any => {
    var loop = (e: any): any => {
        return e.children ? { ...e, [childrenName]: loop(e[childrenName].filter(id)) } : e
    }
    return data.filter(id).map(loop)
}
export const setTreeData = <T>(_data: any, { path, childrenName, value }: TsetTreeData): T => {
    let copy = (e: any) => JSON.parse(JSON.stringify(e))
    let data: any = copy(_data)
    let deepSearch = (tree: any, path: any) => {
        tree[childrenName][path[0]] && path.length > 1
            ? tree[childrenName][path[0]] = deepSearch(tree[childrenName][path[0]], path.slice(1))
            : value ? tree[childrenName][path[0]] = value 
            : tree[childrenName] = tree[childrenName].filter((_: any, i: number) => i !== path[0])
        return tree
    }
    data[path[0]] = path.length > 1 ? deepSearch(data[path[0]], path.slice(1)) : value
    return data
}
export const addTreeData = <T>(_data: any, { path, childrenName, value }: TsetTreeData): T => {
    let copy = (e: any) => JSON.parse(JSON.stringify(e))
    let data: any = copy(_data)
    let deepSearch = (tree: any, path: any) => {
        if (path.length > 1) {
            tree[childrenName][path[0]] = deepSearch(tree[childrenName][path[0]], path.slice(1))
        } else {
            tree[childrenName].splice(path[0], 0, value)
        }
        return tree
    }
    if (path.length > 1) {
        data[path[0]] = deepSearch(data[path[0]], path.slice(1))
    } else {
        data.splice(path[0], 0, value)
    }
    return data
}
export const delectTreeData = <T>(data: any, { path, childrenName }: TdelectTreeData): T => {
    return setTreeData(data, {
        path,
        childrenName,
        value: null
    })
}