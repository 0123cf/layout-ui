import * as React from 'react'
const {Component, useState} = React
import {Select} from './Select'
import {createHtml} from './utils'

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

const HandleColumn = () => {
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
        let html: string
        rowAst = []
        for (let i = 0; i <= columnNumber; i++) {
            rowAst.push(rowASTItemDefault)
        }
        rowInfo = {
            tag: 'div',
            css: ['flex', layoutType],
            style: []
        }
        html = createHtml(rowInfo, rowAst)
        // console.log(layoutType)
        // console.log(columnNumber)
        console.log(html)
    }
    return <div className="HandleColumn">
        <div>一个专注于布局的可视化布局平台</div>
        <div>自定义布局</div>
        <div>
            <div>列数： <input defaultValue={layoutColumn} onInput={layoutColumnChange} placeholder="请输入列数" /></div>
            <div className="flex">
                <p>布局方式：</p>
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
        return (
            <div className="div_layout flex">
                <HandleColumn />
                <DebugLayout />
            </div>
        )
    }
}