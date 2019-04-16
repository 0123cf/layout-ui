import * as React from 'react'
const { useState } = React

import { createHtml } from './utils'
import {layoutTypeList} from '../model/constant' 
import { Select } from './Select'

interface TRowAST {
    tag: string,
    css: string[],
    style: any[],
    innerText?: string
}
interface selectListItem {
    name?: string,
    className: string
}

interface tsethtml {
    (html: string): void
}

interface handleColumnPro {
    sethtml: tsethtml,
    setdebugHtml: tsethtml,
}

export const HandleColumn = (props: handleColumnPro) => {
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
    let addRow = () => {
        // TODO className 不能是内置的class
        let columnNumber = +layoutColumn
        let layoutType = layoutTypeSelected.className
        let rowASTItemDefault: TRowAST = {
            tag: 'div',
            css: [],
            style: [],
            innerText: 'test'
        }
        rowAst = []
        for (let i = 0; i < columnNumber; i++) {
            rowAst.push(rowASTItemDefault)
        }
        rowInfo = {
            tag: 'div',
            css: ['flex', layoutType, className],
            style: [],
        }
        htmlObject = createHtml(rowInfo, rowAst)
        props.sethtml(htmlObject.view)
        props.setdebugHtml(htmlObject.debugView)
    }
    return <div className="HandleColumn">
        <div>
            <div>class： <input defaultValue={className} onInput={classNameChange} placeholder="请输入class" /></div>
            <div>column： <input defaultValue={layoutColumn} onInput={layoutColumnChange} placeholder="请输入列数" /></div>
            <div className="flex">
                <p>layout type：</p>
                <Select activeIndex={0} list={layoutTypeList} change={SelectChange} />
            </div>
            <div className="button" onClick={addRow}>add row</div>
        </div>
    </div>
}