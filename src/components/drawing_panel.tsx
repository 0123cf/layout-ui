import React, { MouseEvent } from 'react'
import { connect } from 'react-redux'
import { Dispatch } from 'redux'
const { useState } = React
import { TRowAST, Tstore } from '../types/index'
import { createHtml, delectTreeData, addTreeData, Copy } from './utils'
import { layoutTypeList, rowASTItemDefault } from '../model/constant'
import { Button, Icon, Modal, message } from 'antd'
import { showSaveConfirm } from '../utils/saveData'
import { getUrlParams } from '../utils/url'

interface Tprops {
    html: string,
    tree: TRowAST[],
    dispatch: Dispatch,
    selectRowPath: number[],
}

let oneRun = true 

const _DebugLayout = (props: Tprops) => {
    let [visible, setvisible] = useState(false)
    let [itemLastChild, setitemLastChild] = useState(false)
    let [contextMenuStyle, setcontextMenuStyle] = useState({})
    let [currentSelectedPath, setcurrentSelectedPath]: any = useState([])
    let projectNameParam = getUrlParams('projectname')

    if(projectNameParam && oneRun){
        let ast = JSON.parse(localStorage[projectNameParam])
        // TODO Verify ast
        props.dispatch({
            type: 'previewHTML',
            html: createHtml(ast).view,
            ast
        })
    }

    let selectRowDiv = (event: MouseEvent, path: number[]) => {
        event.stopPropagation()
        props.dispatch({
            type: 'selectRowPath',
            path
        })
        setvisible(false)
    }
    let delectRow = (event: MouseEvent) => {
        let data: TRowAST[] = delectTreeData(props.tree, { path: currentSelectedPath, childrenName: 'children' })
        props.dispatch({
            type: 'previewHTML',
            html: createHtml(data).view,
            ast: data
        })
        props.dispatch({ type: 'selectRowPath', path: [] })
    }
    let addbrotherRow = (site: string): void => {
        let path = Copy(currentSelectedPath)
        if (site === 'back') {
            path[path.length - 1] = path[path.length - 1] + 1
        }
        let data: TRowAST[] = addTreeData(
            props.tree,
            {
                path,
                childrenName: 'children',
                value: Copy(rowASTItemDefault)
            }
        )
        props.dispatch({
            type: 'previewHTML',
            html: createHtml(data).view,
            ast: data
        })
        // TODO 位置需要确认放哪里合适，先清空
        props.dispatch({ type: 'selectRowPath', path: [] })
    }
    let handleContextMenu = (path: number[], item: TRowAST, event: MouseEvent) => {
        event.preventDefault()
        event.stopPropagation()

        setvisible(true)
        // clientX/Y 获取到的是触发点相对于浏览器可视区域左上角距离
        const clickX: number = event.clientX
        const clickY: number = event.clientY
        // window.innerWidth/innerHeight 获取的是当前浏览器窗口的视口宽度/高度
        const screenW: number = window.innerWidth
        const screenH: number = window.innerHeight
        // 自定义菜单的宽度/高度
        const rootW: number = 100
        const rootH: number = 200

        // right为true，说明鼠标点击的位置到浏览器的右边界的宽度可以放下菜单。否则，菜单放到左边。
        // bottom为true，说明鼠标点击位置到浏览器的下边界的高度可以放下菜单。否则，菜单放到上边。
        const right: boolean = (screenW - clickX) > rootW
        const bottom: boolean = (screenH - clickY) > rootH
        let styles = {
            ...contextMenuStyle,
            left: right ? `${clickX}px` : `${clickX - rootW}px`,
            top: bottom ? `${clickY}px` : `${clickY - rootH}px`
        }
        setcontextMenuStyle(styles)
        setitemLastChild(item.children.length === 0)
        // console.log(path, item)
        setcurrentSelectedPath(path)
    }

    let randerTree = (tree: TRowAST[], path: number[]) => {
        return tree.map((e, index) => {
            let itemPath = [...path, index]
            let getStyle = (style: any) => {
                if (style.backgroundColor) {
                    return {
                        ...style,
                        backgroundImage: 'none'
                    }
                }
                return style
            }
            return <div
                className={`${e.css.join(' ')}${props.selectRowPath.join(',') === itemPath.join(',') && ' item-selected-status'}`}
                onClick={(e: MouseEvent) => selectRowDiv(e, itemPath)}
                key={index}
                style={getStyle(e.style)}
                onContextMenu={handleContextMenu.bind(null, itemPath, e)}
            >{
                    e.children.length > 0 ? randerTree(e.children, itemPath) : (e.innerText || '')
                }</div>
        })
    }
    let gotoProjectList = () => {
        location.href = '/#/'
        location.reload()
    }
    let goProjectList = () => {
        // new project
        if(!projectNameParam){
            if(JSON.stringify(props.tree).length > 2){
                // save project
                showSaveConfirm()
                return
            }
            // no modify project
            gotoProjectList()
            return
        }
        // edit project no modify
        if(localStorage[projectNameParam] === JSON.stringify(props.tree)){
            gotoProjectList()
            return
        }
        // edit AND modify
        Modal.confirm({
            icon: <div></div>,
            title: '是否离开前保存？',
            okText: '保存并返回',
            cancelText: '取消保存并离开',
            content: <div>
                <p>是否离开前保存？</p>
            </div>,
            onOk() {
                return new Promise((resolve, reject) => {
                    localStorage.setItem(projectNameParam || '', JSON.stringify(props.tree))
                    resolve()
                }).catch(() => {
                    gotoProjectList()
                })
            },
            onCancel() {
                gotoProjectList()
            },
        })
    }
    let onSave = () => {
        if(projectNameParam){
            localStorage.setItem(projectNameParam || '', JSON.stringify(props.tree))
            message.success('保存成功')
            return
        }
        showSaveConfirm()
    }
    oneRun = false
    return <div className="DebugLayout" onClick={() => {
        setvisible(false)
    }}>
        <div className="header-handle flex flex-center-y flex-space-x">
            <Icon type="arrow-left" onClick={goProjectList} />
            <Button onClick={onSave} className="save-button">保存</Button>
        </div>
        <div className="view-box" style={{
            width: '550px',
            height: '90vh'
        }}>{randerTree(props.tree, [])}</div>
        {
            visible &&
            <div style={contextMenuStyle} className="contextMenu-wrap">
                {itemLastChild ? <div>
                    <div className="contextMenu-option" onClick={delectRow}>删除布局</div>
                    <div className="contextMenu-option" onClick={addbrotherRow.bind(null, 'front')}>前面添加一个元素</div>
                    <div className="contextMenu-option" onClick={addbrotherRow.bind(null, 'back')}>后面添加一个元素</div>
                </div> :
                    <div>
                        <div className="contextMenu-option" onClick={delectRow}>删除布局</div>
                    </div>
                }
            </div>
        }
    </div>
}
const stateMap = (state: Tstore) => {
    return {
        html: state.previewHTML,
        tree: state.previewAST,
        selectRowPath: state.selectRowPath
    }
}
export default connect(stateMap)(_DebugLayout)