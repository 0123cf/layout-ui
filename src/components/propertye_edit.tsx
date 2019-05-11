import React, { MouseEvent, Component } from 'react'
import { connect } from 'react-redux'
import { Dispatch } from 'redux'
const { useState } = React
import { TRowAST, Tstore } from '../types/index'

import { createHtml, getTreeVal, setTreeData, delectTreeData } from './utils'
import { layoutTypeList, rowASTItemDefault } from '../model/constant'
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
let inputOldTime: number = 0
let inputKey: string = ''
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
    let selectItem: any = props.selectRowPath.length > 0
        ? getTreeVal(props.previewAST, props.selectRowPath.join('.children.'))
        : void 0
    let getRowInfo = (): TRowAST => {
        // TODO className 不能是内置的class
        let columnNumber = +layoutColumn
        let layoutType = layoutTypeSelected.className

        rowAst = []
        for (let i = 0; i < columnNumber; i++) {
            rowAst.push(rowASTItemDefault)
        }
        return {
            tag: 'div',
            css: ['flex', layoutType, className],
            style: {},
            children: rowAst
        }
    }
    let addRow = () => {
        let ast: TRowAST[] = [...props.previewAST, getRowInfo()]
        let htmlObject = createHtml(ast)
        props.dispatch({
            type: 'previewHTML',
            html: htmlObject.view,
            ast
        })
    }
    interface Tdone extends Function {
        (event: MouseEvent): void
    }
    interface LayoutWritePro {
        done?: Tdone;
        type: string;
    }
    let LayoutWrite = (params: LayoutWritePro) => {
        switch (params.type) {
            case 'edit': {
                let setTreeItemDataValue = (value: any) => {
                    let dataAst: TRowAST[] = setTreeData(props.previewAST, {
                        path: props.selectRowPath,
                        childrenName: 'children',
                        value
                    })
                    props.dispatch({
                        type: 'previewHTML',
                        html: createHtml(dataAst).view,
                        ast: dataAst
                    })
                }
                let textAlignSelect = (align: string) => () => {
                    setTreeItemDataValue({
                        ...selectItem,
                        style: {
                            ...selectItem.style,
                            ['textAlign']: align
                        }
                    })
                }
                class EditAttribute extends Component {
                    inputText: any;
                    inputHeight: any;
                    inputWidth: any;
                    inputBorder: any;
                    inputBackground: any;
                    inputColor: any;
                    inputLineHeight: any;
                    inputBackRadius: any;
                    inputPadding: any;
                    inputMargin: any;
                    constructor(props: any) {
                        super(props)
                        this.inputText = React.createRef()
                        this.inputHeight = React.createRef()
                        this.inputWidth = React.createRef()
                        this.inputBorder = React.createRef()
                        this.inputBackground = React.createRef()
                        this.inputColor = React.createRef()
                        this.inputLineHeight = React.createRef()
                        this.inputBackRadius = React.createRef()
                        this.inputPadding = React.createRef()
                        this.inputMargin = React.createRef()
                    }
                    componentDidMount() {
                        if (inputOldTime && +new Date() < inputOldTime + 1000) {
                            switch (inputKey) {
                                case 'inputText': {
                                    this.inputText.current.focus()
                                    break
                                }
                                case 'inputHeight': {
                                    this.inputHeight.current.focus()
                                    break
                                }
                                case 'inputWidth': {
                                    this.inputWidth.current.focus()
                                    break
                                }
                                case 'inputBorder': {
                                    this.inputBorder.current.focus()
                                    break
                                }
                                case 'inputBackground': {
                                    this.inputBackground.current.focus()
                                    break
                                }
                                case 'inputColor': {
                                    this.inputColor.current.focus()
                                    break
                                }
                                case 'inputLineHeight': {
                                    this.inputLineHeight.current.focus()
                                    break
                                }
                                case 'inputBackRadius': {
                                    this.inputBackRadius.current.focus()
                                    break
                                }
                                case 'inputPadding': {
                                    this.inputPadding.current.focus()
                                    break
                                }
                                case 'inputMargin': {
                                    this.inputMargin.current.focus()
                                    break
                                }
                            }
                        }
                    }
                    render() {
                        return <div>
                            <div className="group-title-name">编辑属性</div>
                            <div>宽度: <input ref={this.inputWidth} defaultValue={selectItem.style.width ? selectItem.style.width.replace('px', '') : ''} onChange={(e: any) => {
                                let v = e.target.value
                                inputOldTime = +new Date()
                                inputKey = 'inputWidth'
                                setTreeItemDataValue({
                                    ...selectItem,
                                    style: {
                                        ...selectItem.style,
                                        'width': `${v}px`
                                    }
                                })
                            }} /></div>
                            <div>高度: <input ref={this.inputHeight} defaultValue={selectItem.style.height ? selectItem.style.height.replace('px', '') : ''} onChange={(e: any) => {
                                let v = e.target.value
                                inputOldTime = +new Date()
                                inputKey = 'inputHeight'
                                setTreeItemDataValue({
                                    ...selectItem,
                                    style: {
                                        ...selectItem.style,
                                        'height': `${v}px`
                                    }
                                })
                            }} /></div>
                            <div>文字内容: <input ref={this.inputText} defaultValue={selectItem.innerText} onChange={(e: any) => {
                                let textValue = e.target.value
                                inputOldTime = +new Date()
                                inputKey = 'inputText'
                                setTreeItemDataValue({
                                    ...selectItem,
                                    innerText: textValue
                                })
                                e.target.focus()
                            }} /></div>
                            <div>
                                <span>水平对齐方式: </span>
                                <span>{selectItem.style['textAlign'] || 'left'}</span>
                                <div className="select-button">
                                    <span className="item" onClick={textAlignSelect('left')}>left</span>
                                    <span className="item" onClick={textAlignSelect('center')}>center</span>
                                    <span className="item" onClick={textAlignSelect('right')}>right</span>
                                </div>
                            </div>
                            <div>边框: <input ref={this.inputBorder} defaultValue={selectItem.style.border || ''} onChange={(e: any) => {
                                let v = e.target.value
                                inputOldTime = +new Date()
                                inputKey = 'inputBorder'
                                setTreeItemDataValue({
                                    ...selectItem,
                                    style: {
                                        ...selectItem.style,
                                        'border': v
                                    }
                                })
                            }} />
                                <div className="otherInfo">
                                    <p>数值px 线条 #颜色</p>
                                    <p>如： 1px solid red</p>
                                </div>
                            </div>
                            <div>背景颜色: <input ref={this.inputBackground} defaultValue={selectItem.style.backgroundColor || ''} onChange={(e: any) => {
                                let v = e.target.value
                                inputOldTime = +new Date()
                                inputKey = 'inputBackground'
                                setTreeItemDataValue({
                                    ...selectItem,
                                    style: {
                                        ...selectItem.style,
                                        'backgroundColor': v
                                    }
                                })
                            }} />
                            </div>
                            <div>字体颜色: <input ref={this.inputColor} defaultValue={selectItem.style.color || ''} onChange={(e: any) => {
                                let v = e.target.value
                                inputOldTime = +new Date()
                                inputKey = 'inputColor'
                                setTreeItemDataValue({
                                    ...selectItem,
                                    style: {
                                        ...selectItem.style,
                                        'color': v
                                    }
                                })
                            }} />
                            </div>
                            <div>字体间距: <input ref={this.inputLineHeight} defaultValue={selectItem.style.lineHeight ? selectItem.style.lineHeight.replace('px', '') : ''} onChange={(e: any) => {
                                let v = e.target.value
                                inputOldTime = +new Date()
                                inputKey = 'inputLineHeight'
                                setTreeItemDataValue({
                                    ...selectItem,
                                    style: {
                                        ...selectItem.style,
                                        'lineHeight': `${v}px`
                                    }
                                })
                            }} />
                            </div>
                            <div>圆角: <input ref={this.inputBackRadius} defaultValue={selectItem.style.borderRadius || ''} onChange={(e: any) => {
                                let v = e.target.value
                                inputOldTime = +new Date()
                                inputKey = 'inputBackRadius'
                                setTreeItemDataValue({
                                    ...selectItem,
                                    style: {
                                        ...selectItem.style,
                                        'borderRadius': v
                                    }
                                })
                            }} />
                                <div className="otherInfo">
                                    <p>上 右 下 左</p>
                                    <p>如： 4px 2px 3px 4px</p>
                                </div>
                            </div>
                        </div>
                    }
                }
                if (selectItem.children.length === 0) {
                    return <div className="inner">
                        <EditAttribute />
                        <div className="group-title-name">插入新布局</div>
                        <div>class： <input defaultValue={className} onInput={classNameChange} placeholder="请输入class" /></div>
                        <div>column： <input defaultValue={layoutColumn} type="number" onInput={layoutColumnChange} placeholder="请输入列数" /></div>
                        <div className="flex">
                            <p>layout type：</p>
                            <Select activeIndex={0} list={layoutTypeList} change={SelectChange} />
                        </div>
                        <div className="button" onClick={() => {
                            let itemAst: TRowAST = getRowInfo()
                            setTreeItemDataValue(itemAst)
                        }}>~插入~</div>
                    </div>
                } else {
                    let className: string = selectItem.css[2]
                    let layoutTypeSelected: selectListItem = layoutTypeList[0]
                    let editRow = () => {
                        let data: TRowAST[] = setTreeData(props.previewAST, {
                            path: props.selectRowPath,
                            childrenName: 'children',
                            value: {
                                ...selectItem,
                                css: [selectItem.css[0], layoutTypeSelected.className, className],
                            }
                        })
                        props.dispatch({
                            type: 'previewHTML',
                            html: createHtml(data).view,
                            ast: data
                        })
                    }
                    let delectRow = () => {
                        let data: TRowAST[] = delectTreeData(props.previewAST, { path: props.selectRowPath, childrenName: 'children' })
                        props.dispatch({
                            type: 'previewHTML',
                            html: createHtml(data).view,
                            ast: data
                        })
                        props.dispatch({ type: 'selectRowPath', path: [] })
                    }
                    return <div className="inner">
                        <EditAttribute />
                        <div className="group-title-name">修改布局</div>
                        <div>class： <input defaultValue={className} onInput={(e: any) => {
                            className = e.target.value
                        }} placeholder="请输入class" /></div>
                        <div className="flex">
                            <p>layout type：</p>
                            <Select
                                activeIndex={layoutTypeList.findIndex(e => e.className === selectItem.css[1])}
                                list={layoutTypeList} change={(index: number) => {
                                    layoutTypeSelected = layoutTypeList[index]
                                }}
                            />
                        </div>
                        <div className="button" onClick={editRow}>确认修改</div>
                        <div className="button button-delect" onClick={delectRow}>删除</div>
                    </div>
                }
            }
            case 'add': {
                return <div className="inner">
                    <div>class： <input defaultValue={className} onInput={classNameChange} placeholder="请输入class" /></div>
                    <div>column： <input defaultValue={layoutColumn} type="number" onInput={layoutColumnChange} placeholder="请输入列数" /></div>
                    <div className="flex">
                        <p>layout type：</p>
                        <Select activeIndex={0} list={layoutTypeList} change={SelectChange} />
                    </div>
                    <div className="button" onClick={addRow}>~添加~</div>
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
                {/* <div className="title-name">Edit Element Layout</div> */}
                <LayoutWrite type="edit" />
            </div> :
                <div>
                    {/* <div className="title-name">ADD Element Layout</div>
                    <LayoutWrite type="add" /> */}
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
export default connect(stateMapToProps)(_HandleColumn)