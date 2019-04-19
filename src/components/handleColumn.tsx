import React, {MouseEvent} from 'react'
import { connect } from 'react-redux'
import { Dispatch } from 'redux'
const { useState } = React
import {TRowAST, Tstore} from '../types/index'

import { createHtml, getTreeVal } from './utils'
import {layoutTypeList} from '../model/constant' 
import { Select } from './Select'

interface selectListItem {
    name?: string,
    className: string
}
interface Tstate {
    previewAST: TRowAST[],
    selectRowPath: number[]
}
interface Tprops extends Tstate {
    dispatch: Dispatch
}
const _HandleColumn = (props: Tprops) => {
    let layoutTypeSelected: selectListItem = layoutTypeList[0]
    let layoutColumn = '2'
    let className = ''
    // 储存row布局AST
    let rowAst: TRowAST[] = []
    let rowInfo: TRowAST
    let htmlObject
    let layoutColumnChange = (e: any) => {
        let value = e.target.value.replace(/[^\d]/, '')
        e.target.value = value
        layoutColumn = value
    }
    let classNameChange = (e: any) => {
        className = e.target.value
    }
    let SelectChange = (selectIndex: number) => {
        layoutTypeSelected = layoutTypeList[selectIndex]
    }
    let selectItem: TRowAST | void = props.selectRowPath.length > 0 
        ? getTreeVal(props.previewAST, props.selectRowPath.join('.children.'))
        : void 0
    let addRow = () => {
        // TODO className 不能是内置的class
        let columnNumber = +layoutColumn
        let layoutType = layoutTypeSelected.className
        let rowASTItemDefault: TRowAST = {
            tag: 'div',
            css: [],
            style: [],
            innerText: '',
            children: []
        }
        let ast: TRowAST[]

        rowAst = []
        for (let i = 0; i < columnNumber; i++) {
            rowAst.push(rowASTItemDefault)
        }
        rowInfo = {
            tag: 'div',
            css: ['flex', layoutType, className],
            style: [],
            children: rowAst
        }
        ast = [...props.previewAST, rowInfo]
        htmlObject = createHtml(ast)
        props.dispatch({
            type: 'previewHTML',
            html: htmlObject.view,
            ast
        })
    }
    let editRow = () => {
        console.log('edit')
    }
    interface Tdone extends Function{
        (event: MouseEvent): void
    }
    interface LayoutWritePro{
        done: Tdone;
        type: string;
    }
    console.log('开发中...')
    console.log(selectItem)
    let LayoutWrite = (params: LayoutWritePro) => {
        switch(params.type){
            case 'edit': {
                return <div className="inner">
                    <div>class： <input defaultValue={className} onInput={classNameChange} placeholder="请输入class" /></div>
                    <div>column： <input defaultValue={layoutColumn} type="number" onInput={layoutColumnChange} placeholder="请输入列数" /></div>
                    <div className="flex">
                        <p>layout type：</p>
                        <Select activeIndex={0} list={layoutTypeList} change={SelectChange} />
                    </div>
                    <div className="button" onClick={params.done}>success edit</div>
                </div>
            }
            case 'add': {
                return <div className="inner">
                    <div>class： <input defaultValue={className} onInput={classNameChange} placeholder="请输入class" /></div>
                    <div>column： <input defaultValue={layoutColumn} type="number" onInput={layoutColumnChange} placeholder="请输入列数" /></div>
                    <div className="flex">
                        <p>layout type：</p>
                        <Select activeIndex={0} list={layoutTypeList} change={SelectChange} />
                    </div>
                    <div className="button" onClick={params.done}>add</div>
                </div>
            }
            default: {
                return <div></div>
            }
        } 
    }
    return <div className="HandleColumn">      
        <div>
            {selectItem ? <div>
                    <div className="title-name">Edit Element Layout</div>
                    <LayoutWrite done={editRow} type="edit" />
                </div>:
                <div>
                    <div className="title-name">ADD Element Layout</div>
                    <LayoutWrite done={addRow} type="add" />
                </div>
            }
            
        </div>
    </div>
}
const stateMapToProps = (state: Tstore) => {
    return {
        previewAST: state.previewAST,
        selectRowPath: state.selectRowPath
    }
}
export const HandleColumn = connect(stateMapToProps)(_HandleColumn)
// export const HandleColumn = () => <div></div>