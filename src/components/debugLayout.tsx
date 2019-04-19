import React, { MouseEvent } from 'react'
import { connect } from 'react-redux'
import { Dispatch } from 'redux'
const { useState } = React
import { TRowAST, Tstore } from '../types/index'

interface Tprops {
    html: string,
    tree: TRowAST[],
    dispatch: Dispatch,
    selectRowPath: number[],
}

const _DebugLayout = (props: Tprops) => {

    let selectRowDiv = (event: MouseEvent, path: number[]) => {
        event.stopPropagation()
        props.dispatch({
            type: 'selectRowPath',
            path
        })
    }

    let randerTree = (tree: TRowAST[], path: number[]) => {
        return tree.map((e, index) => {
            let itemPath = [...path, index]
            return <div
                className={`${e.css.join(' ')}${props.selectRowPath.join(',') === itemPath.join(',') && 'item-selected-status'}`}
                onClick={(e: MouseEvent) => selectRowDiv(e, itemPath)}
            >{
                    e.children.length > 0 ? randerTree(e.children, itemPath) :
                        (e.innerText || '')
                }</div>
        })
    }
    return <div className="DebugLayout">
        <span>DebugLayout</span>
        <div className="view-box">{randerTree(props.tree, [])}</div>
    </div>
}
const stateMap = (state: Tstore) => {
    return {
        html: state.previewHTML,
        tree: state.previewAST,
        selectRowPath: state.selectRowPath
    }
}
export const DebugLayout = connect(stateMap)(_DebugLayout)