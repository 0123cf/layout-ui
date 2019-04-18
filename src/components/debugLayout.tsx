import * as React from 'react'
import {connect} from 'react-redux'
const { useState } = React
interface TRowAST {
    tag: string,
    css: string[],
    style: any[],
    innerText?: string,
    children: TRowAST[]
}

interface Tprops{
    html: string,
    tree: TRowAST[]
}

let randerTree = (tree: TRowAST[]) => {
    return tree.map(e => <div className={e.css.join(' ')}>{
            e.children.length > 0 ? randerTree(e.children) : 
            (e.innerText || '')
        }</div>
    )
}

const _DebugLayout = (props: Tprops) => {
    return <div className="DebugLayout">
        <span>DebugLayout</span>
        <div className="view-box">{randerTree(props.tree)}</div>
    </div>
}
const stateMap = (state: any):Tprops => {
    return {
        html: state.previewHTML,
        tree: state.previewAST
    }
}
export const DebugLayout = connect(stateMap)(_DebugLayout)