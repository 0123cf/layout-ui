import React, { lazy, Suspense, useState } from 'react'
import { connect } from 'react-redux'
import { Dispatch } from 'redux'
import { Tstore } from '../types/index'
const SyntaxHighlighter = lazy(() => import('react-syntax-highlighter'))
import { docco } from '../model/constant'
import { Button } from 'antd'

interface Tprops {
    html: string,
    showPreview: Boolean,
    dispatch: Dispatch
}

const _Preview = (props: Tprops) => {
    let [isShowAst, setisShowAst] = useState(false)
    let [html, sethtml] = useState('')
    if(!props.showPreview){
        return <div></div>
    }
    ;(async () => {
        let jsbeautify = await import('js-beautify')
        sethtml(jsbeautify.html_beautify(props.html))
        setisShowAst(true)
    })()
    return <div>
        {isShowAst && <div className="cat-ast">
            <div className="flex">
                <div className="preview">
                    <div className="title">preview</div>
                    <div className="preview-box" dangerouslySetInnerHTML={{ __html: props.html }}></div>
                </div>
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
            <Button style={{marginLeft: '20px'}} onClick={() => {
                props.dispatch({
                    type: 'showPreview',
                    value: false
                })
            }}>返回</Button>
        </div>}
    </div>
}
const stateMap = (state: Tstore) => {
    return {
        html: state.previewHTML,
        showPreview: state.showPreview,
    }
}
export default connect(stateMap)(_Preview)