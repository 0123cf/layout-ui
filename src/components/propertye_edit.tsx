import React, { MouseEvent, Component } from 'react'
import { connect } from 'react-redux'
import { Dispatch } from 'redux'
import { TRowAST, Tstore } from '../types/index'

import { createHtml, getTreeVal, setTreeData } from '../utils/utils'
import { layoutTypeList, rowASTItemDefault } from '../model/constant'
import { Select } from './components/Select'
import { SketchPicker } from 'react-color'
import { Slider } from 'antd'
import { string } from 'prop-types'
import { BoxEditor } from './box-editor/src/index'

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
interface TcolorPickStyle {
    top: string,
    right: string,
}
interface TcolorPickProps {
    color: string,
    onChange: (color: any) => void
}
interface TSlassState {
    selectRowPath: number[],
    isColorPick: boolean,
    // 颜色选择器位置
    colorPickStyle: TcolorPickStyle,
    colorPickProps: TcolorPickProps,
    inputWidth: string,
}
let inputOldTime: number = 0
let inputKey: string = ''
let props: Tprops
// 已选择的对象
let selectItem: any
class HandleColumn extends React.Component<Tprops, TSlassState>{
    private inputWidth: any;
    private inputHeight: any;
    private inputBackRadius: any;
    private inputLineHeight: any;
    constructor(props: Tprops) {
        super(props)
        this.inputWidth = React.createRef()
        this.inputHeight = React.createRef()
        this.inputBackRadius = React.createRef()
        this.inputLineHeight = React.createRef()
        this.state = {
            selectRowPath: [],
            isColorPick: false,
            colorPickStyle: {
                top: '0px',
                right: '300px',
            },
            colorPickProps: {
                color: '',
                onChange: (color: any) => void 0
            },
            inputWidth: '0'
        }
    }
    shouldComponentUpdate(nextProps: Tprops, nextState: TSlassState) {
        selectItem = nextProps.selectRowPath.length > 0
            ? getTreeVal(nextProps.previewAST, nextProps.selectRowPath.join('.children.'))
            : void 0
        return (JSON.stringify(nextProps.selectRowPath) !== JSON.stringify(nextState.selectRowPath)
            || nextState.isColorPick !== this.state.isColorPick
        )
    }
    render() {
        props = this.props
        this.setState({
            selectRowPath: props.selectRowPath
        })
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
        selectItem = props.selectRowPath.length > 0
            ? getTreeVal(props.previewAST, props.selectRowPath.join('.children.'))
            : void 0
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
        const setColor = (currentColor: string, key: string, val: boolean) => (e: MouseEvent) => {
            this.setState({
                isColorPick: val,
                colorPickStyle: {
                    ...this.state.colorPickStyle,
                    top: `${e.clientY}px`,
                },
                colorPickProps: {
                    color: currentColor,
                    onChange: (color: any) => {
                        setTreeItemDataValue({
                            ...selectItem,
                            style: {
                                ...selectItem.style,
                                [key]: `rgba(${color.rgb.r},${color.rgb.g},${color.rgb.b},${color.rgb.a})`
                            }
                        })
                        return void 0
                    }
                }
            })
        }
        let LayoutWrite = () => {
            let textAlignSelect = (align: string) => () => {
                setTreeItemDataValue({
                    ...selectItem,
                    style: {
                        ...selectItem.style,
                        ['textAlign']: align
                    }
                })
            }
            let EditAttribute = () => {
                return <div className="edit-attribute">
                    {this.state.isColorPick && <div className="color-box  sketch-color-price-box" style={this.state.colorPickStyle}>
                        <SketchPicker color={this.state.colorPickProps.color} onChange={this.state.colorPickProps.onChange} />
                    </div>
                    }
                    {selectItem.tag === 'div' && <div>
                        <div className="select-button select-text-align">
                            <img onClick={textAlignSelect('left')} src={require(`../svg/text-left.svg`)} />
                            <img onClick={textAlignSelect('center')} src={require(`../svg/text-center.svg`)} />
                            <img onClick={textAlignSelect('right')} src={require(`../svg/text-right.svg`)} />
                        </div>
                    </div>}
                    <BoxEditor
                        onStart={() => 0}
                        marginLeft={selectItem.style.marginLeft ? +selectItem.style.marginLeft.replace('px', '') : 0}
                        marginTop={selectItem.style.marginTop ? +selectItem.style.marginTop.replace('px', '') : 0}
                        marginRight={selectItem.style.marginRight ? +selectItem.style.marginRight.replace('px', '') : 0}
                        marginBottom={selectItem.style.marginBottom ? +selectItem.style.marginBottom.replace('px', '') : 0}
                        paddingLeft={selectItem.style.paddingLeft ? +selectItem.style.paddingLeft.replace('px', '') : 0}
                        paddingTop={selectItem.style.paddingTop ? +selectItem.style.paddingTop.replace('px', '') : 0}
                        paddingRight={selectItem.style.paddingRight ? +selectItem.style.paddingRight.replace('px', '') : 0}
                        paddingBottom={selectItem.style.paddingBottom ? +selectItem.style.paddingBottom.replace('px', '') : 0}
                        onChange={(site, val) => {
                            setTreeItemDataValue({
                                ...selectItem,
                                style: {
                                    ...selectItem.style,
                                    [site]: `${val}px`
                                }
                            })
                        }}
                        onFinalChange={() => 0}
                    />
                    <div className="flex flex-space-x flex-center-y slider-text-box">
                        <span onDoubleClick={() => {
                            setTreeItemDataValue({
                                ...selectItem,
                                style: {
                                    ...selectItem.style,
                                    'width': `auto`
                                }
                            })
                            this.inputWidth.current.value = 'auto'
                        }} className="name">width</span>
                        <Slider max={550} min={1} className="slider" defaultValue={selectItem.style.width ? +(selectItem.style.width.replace('px', '')) : 0} disabled={false} onChange={(e) => {
                            setTreeItemDataValue({
                                ...selectItem,
                                style: {
                                    ...selectItem.style,
                                    'width': `${e}px`
                                }
                            })
                            this.inputWidth.current.value = e
                        }} />
                        <input ref={this.inputWidth} defaultValue={selectItem.style.width ? (selectItem.style.width.replace('px', '')) : '0'} onChange={(e: any) => {
                            let v = e.target.value
                            setTreeItemDataValue({
                                ...selectItem,
                                style: {
                                    ...selectItem.style,
                                    'width': `${v}px`
                                }
                            })
                        }} />
                    </div>
                    <div className="flex flex-space-x flex-center-y slider-text-box">
                        <span onDoubleClick={() => {
                            setTreeItemDataValue({
                                ...selectItem,
                                style: {
                                    ...selectItem.style,
                                    'height': `auto`
                                }
                            })
                            this.inputHeight.current.value = 'auto'
                        }} className="name ">height</span>
                        <Slider max={600} min={1} className="slider" defaultValue={selectItem.style.height ? +(selectItem.style.height.replace('px', '')) : 0} disabled={false} onChange={(e) => {
                            setTreeItemDataValue({
                                ...selectItem,
                                style: {
                                    ...selectItem.style,
                                    'height': `${e}px`
                                }
                            })
                            this.inputHeight.current.value = e
                        }} />
                        <input ref={this.inputHeight} defaultValue={selectItem.style.height ? selectItem.style.height.replace('px', '') : ''} onChange={(e: any) => {
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
                        }} />
                    </div>
                    <div className="flex flex-space-x flex-center-y slider-text-box">
                        <span className="name">redius</span>
                        <Slider max={300} min={0} className="slider" defaultValue={parseFloat(selectItem.style.borderRadius) ? parseFloat(selectItem.style.borderRadius) : 0} disabled={false} onChange={(e) => {
                            setTreeItemDataValue({
                                ...selectItem,
                                style: {
                                    ...selectItem.style,
                                    'borderRadius': new Array(4).fill(e + 'px').join(' ')
                                }
                            })
                            this.inputBackRadius.current.value = e
                        }} />
                        <input ref={this.inputBackRadius} defaultValue={parseFloat(selectItem.style.borderRadius) ? (parseFloat(selectItem.style.borderRadius)) + '' : '0'} onChange={(e: any) => {
                            let v = e.target.value
                            if (isNaN(v)) {
                                e.target.value = v.replace(/[^\d]/, '')
                            }
                            setTreeItemDataValue({
                                ...selectItem,
                                style: {
                                    ...selectItem.style,
                                    'borderRadius': new Array(4).fill(v + 'px').join(' ')
                                }
                            })
                        }} />
                    </div>
                    {selectItem.tag === 'div' && <div className="flex flex-space-x flex-center-y slider-text-box">
                        <span className="name">LH</span>
                        <Slider max={300} min={0} className="slider" defaultValue={selectItem.style.lineHeight ? +(selectItem.style.lineHeight.replace('px', '')) : 0} disabled={false} onChange={(e) => {
                            setTreeItemDataValue({
                                ...selectItem,
                                style: {
                                    ...selectItem.style,
                                    'lineHeight': `${e}px`
                                }
                            })
                            this.inputLineHeight.current.value = e
                        }} />
                        <input ref={this.inputLineHeight} defaultValue={selectItem.style.lineHeight ? selectItem.style.lineHeight.replace('px', '') : ''} onChange={(e: any) => {
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
                    </div>}
                    {selectItem.tag === 'div' && <div>
                        <textarea className="input-textarea" placeholder="文字内容" defaultValue={selectItem.innerText} onChange={(e: any) => {
                            let textValue = e.target.value
                            setTreeItemDataValue({
                                ...selectItem,
                                innerText: textValue
                            })
                            e.target.focus()
                        }} />
                    </div>}
                    {selectItem.tag === 'img' && <div>
                        <textarea className="input-textarea" placeholder="输入URL" defaultValue={selectItem.src} onChange={(e: any) => {
                            let textValue = e.target.value
                            setTreeItemDataValue({
                                ...selectItem,
                                src: textValue
                            })
                            e.target.focus()
                        }} />
                    </div>}
                    {/* <div>
                        <div className="flex">边框:
                                <input style={{ width: '100px' }} defaultValue={selectItem.style.border || ''} onChange={(e: any) => {
                                let v = e.target.value
                                setTreeItemDataValue({
                                    ...selectItem,
                                    style: {
                                        ...selectItem.style,
                                        'border': v
                                    }
                                })
                            }} />
                        </div>
                        <div className="otherInfo">
                            <p>数值px 线条 #颜色</p>
                            <p>如： 1px solid red</p>
                        </div>
                    </div> */}
                    {selectItem.tag === 'div' && <div className="color-set-box">
                        <span>背景颜色</span>
                        <span onClick={setColor(selectItem.style.backgroundColor || '', 'backgroundColor', !this.state.isColorPick)} className="showCurrentColor" style={{ backgroundColor: selectItem.style.backgroundColor || '' }}></span>
                        <input defaultValue={selectItem.style.backgroundColor || ''} onChange={(e: any) => {
                            let v = e.target.value
                            setTreeItemDataValue({
                                ...selectItem,
                                style: {
                                    ...selectItem.style,
                                    'backgroundColor': v
                                }
                            })
                        }} />
                    </div>}
                    {selectItem.tag === 'div' && <div className="color-set-box">
                        <span className="name">字体颜色</span>
                        <span onClick={setColor(selectItem.style.color || '', 'color', !this.state.isColorPick)} className="showCurrentColor" style={{ backgroundColor: selectItem.style.color || '' }}></span>
                        <input defaultValue={selectItem.style.color || ''} onChange={(e: any) => {
                            let v = e.target.value
                            setTreeItemDataValue({
                                ...selectItem,
                                style: {
                                    ...selectItem.style,
                                    'color': v
                                }
                            })
                        }} />
                    </div>}
                </div>
            }
            if (selectItem.children.length === 0) {
                return <div className="inner">
                    <EditAttribute />
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
                return <div className="inner">
                    <EditAttribute />
                    {selectItem.css[1] && <div>
                        <div className="group-title-name">修改布局</div>
                        <div>class： <input defaultValue={className} onInput={(e: any) => {
                            className = e.target.value
                        }} placeholder="请输入class" /></div>
                        <div className="flex">
                            <Select
                                activeIndex={layoutTypeList.findIndex(e => e.className === selectItem.css[1])}
                                list={layoutTypeList} change={(index: number) => {
                                    layoutTypeSelected = layoutTypeList[index]
                                    editRow()
                                }}
                            />
                        </div>
                    </div>}
                </div>
            
            }
        }
        return <div className="HandleColumn" onClick={() => {
            if (this.state.isColorPick) {
                this.setState({
                    isColorPick: false,
                })
            }
        }}>
            <div>
                {selectItem && <div>
                    {/* <div className="title-name">Edit Element Layout</div> */}
                    <LayoutWrite />
                </div>}
                {!selectItem && <div className="no-tree">
                    <div>
                        <div className="tip-text">QAQ</div>
                        <div className="tip-button">未点击选择组件</div>
                    </div>
                </div>}
            </div>
        </div>
    }
}
const stateMapToProps = (state: Tstore) => {
    return {
        previewAST: state.previewAST,
        selectRowPath: state.selectRowPath
    }
}
export default connect(stateMapToProps)(HandleColumn)