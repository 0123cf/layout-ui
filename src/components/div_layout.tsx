import * as React from 'react'
const {Component, useState} = React
import {createHtml} from './utils'

import {Select} from './Select'
import {Preview} from './preview'

interface DivLayoutPro {
    name: string
}
interface TRowAST {
    tag: string,
    css: string[],
    style: any []
}

interface selectListItem {
    name: string
}

interface tsethtml {
    (html: string): void
}

interface handleColumnPro {
    sethtml: tsethtml
}

const HandleColumn = (props: handleColumnPro) => {
    let layoutTypeList: selectListItem[] = [
        {name: 'space'},
        {name: 'row'},
        {name: 'column'},
    ]
    let layoutTypeSelected: selectListItem = layoutTypeList[0]
    let [layoutColumn, setlayoutColumn] = useState('2')
    // 储存row布局AST
    let rowAst: TRowAST [] = []
    let rowInfo: TRowAST
    let layoutColumnChange = (e: any) => {
        let value = e.target.value.replace(/[^\d]/, '')
        e.target.value = value
        layoutColumn = value
    }
    let SelectChange = (selectIndex: number) => {
        layoutTypeSelected =layoutTypeList[selectIndex]
    }
    let addRow = () => {
        let columnNumber = +layoutColumn
        let layoutType = layoutTypeSelected.name
        let rowASTItemDefault: TRowAST = {
            tag: 'div',
            css: [],
            style: []
        }
        rowAst = []
        for (let i = 0; i <= columnNumber; i++) {
            rowAst.push(rowASTItemDefault)
        }
        rowInfo = {
            tag: 'div',
            css: ['flex', layoutType],
            style: []
        }
        props.sethtml(createHtml(rowInfo, rowAst))
        // console.log(layoutType)
        // console.log(columnNumber)
        // console.log(html)
    }
    return <div className="HandleColumn">
        <div>
            <div>column： <input defaultValue={layoutColumn} onInput={layoutColumnChange} placeholder="请输入列数" /></div>
            <div className="flex">
                <p>layout type：</p>
                <Select activeIndex={0} list={layoutTypeList} change={SelectChange} />
            </div>
            <div className="button" onClick={addRow}>add row</div>
        </div>
    </div>
}
const DebugLayout = () => {
    return <div className="DebugLayout">
        <span>DebugLayout</span>
    </div>
}

export class DivLayout extends Component<DivLayoutPro, {}>{
    render(){
        let sethtml = (html: string): void => {
            console.log(html)
        }
        return (
            <div className="div_layout flex">
                <HandleColumn sethtml={sethtml} />
                <DebugLayout />
                <Preview />
            </div>
        )
    }
}