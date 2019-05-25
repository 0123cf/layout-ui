import React from 'React'
const {useState, lazy, Suspense } = React
import { connect } from 'react-redux'
import { Dispatch } from 'redux'
import { TRowAST, Tstore } from '../types/index'
import { layoutTypeList, rowASTItemDefault } from '../model/constant'
import { createHtml, setTreeData, getTreeVal } from './utils'
import { Preview } from './preview'
const SyntaxHighlighter = lazy(() => import('react-syntax-highlighter'))
// import { docco } from 'react-syntax-highlighter/dist/esm/styles/hljs'
import { docco } from '../model/constant'

interface Tstate {
    previewAST: TRowAST[],
}
interface Tprops extends Tstate {
    dispatch: Dispatch,
    previewAST: TRowAST[],
    selectRowPath: number[],
    html: string,
}
const View = (props: Tprops) => {
    let rowAst  
    let [isShowAst, setisShowAst] = useState(false)
    let [html, sethtml] = useState('')
    let getRowInfo = (typeIndex: number): TRowAST => {
        let layoutType = layoutTypeList[typeIndex].className

        rowAst = []
        for (let i = 0; i < 3; i++) {
            rowAst.push(rowASTItemDefault)
        }
        return {
            tag: 'div',
            css: [''],
            style: {},
            children: [
                {
                    tag: 'div',
                    css: ['flex', layoutType, ''],
                    style: {},
                    children: rowAst
                }
            ]
        }
    }
    let addRow = (index: number) => () => {
        if(props.selectRowPath.length === 0){
            let ast: TRowAST[] = [...props.previewAST, getRowInfo(index)]
            let htmlObject = createHtml(ast)
            let html =  htmlObject.view

            props.dispatch({
                type: 'previewHTML',
                html,
                ast
            })
        }else{
            let selectItem = getTreeVal(props.previewAST, props.selectRowPath.join('.children.'))
            let dataAst: TRowAST[] = setTreeData(props.previewAST, {
                path: props.selectRowPath,
                childrenName: 'children',
                value: {
                    ...getRowInfo(index),
                    style: {...selectItem.style},
                    children: [
                        ...selectItem.children,
                        ...getRowInfo(index).children
                    ]
                }
            })
            props.dispatch({
                type: 'previewHTML',
                html: createHtml(dataAst).view,
                ast: dataAst
            })
        }
    }
    return <div className="util_panel">
        <div className="add-layout">
            <div>插入布局</div>
            <p><img className="layout-svg" onClick={addRow(0)} src={require(`../svg/flex-row-x.svg`)} /></p>
            <p><img className="layout-svg" onClick={addRow(3)} src={require(`../svg/flex-space-x.svg`)} /></p>
            <p><img className="layout-svg" onClick={addRow(2)} src={require(`../svg/flex-center-x.svg`)} /></p>
            <p><img className="layout-svg" onClick={addRow(1)} src={require(`../svg/flex-row-x-r.svg`)} /></p>
        </div>
        <div className="footer-bar flex al-flex-end-x">
            <i className="icon-icon-arrow-down iconfont" onClick={async () => {
                setisShowAst(!isShowAst)
                if(isShowAst === false){
                    let jsbeautify = await import('js-beautify')
                    sethtml(jsbeautify.html_beautify(props.html))
                }
            }}></i>
        </div>
        {isShowAst && 
            <div className="cat-ast">
                <div className="flex">
                    <Preview />
                    <div>
                        <p>
                            <i className="iconfont icon-daima"></i>
                        </p>
                        <div className="ast-show">
                            <Suspense fallback={<div>Loading...</div>}>
                                <SyntaxHighlighter language='html' style={docco}>{html}</SyntaxHighlighter>
                            </Suspense>
                        </div>
                    </div>
                </div>
            </div>
        }
        {/* <div className="add">
            <div>绘制</div>
            <p><i className="iconfont icon-kuangjiaframe23"></i>框</p>
            <p><i className="iconfont icon-tuoyuanxing"></i>圆角</p>
            <p><i className="iconfont icon-text_tool"></i>文字</p>
        </div> */}
    </div>
}

const stateMapToProps = (state: Tstore) => {
    return {
        previewAST: state.previewAST,
        selectRowPath: state.selectRowPath,
        html: state.previewHTML
    }
}
export default connect(stateMapToProps)(View)