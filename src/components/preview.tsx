import * as React from 'react'
import {connect} from 'react-redux'
interface Tprops{
    html: string
}

const _Preview = (props: Tprops) => {
    return <div className="preview">
        <div className="title">preview</div>
        <div className="preview-box" dangerouslySetInnerHTML={{__html: props.html}}></div>
        <div>html</div>
        <div>
            <textarea value={props.html}></textarea>
        </div>
    </div>
}
const stateMap = (state: any):Tprops => {
    return {
        html: state.previewHTML
    }
}
export const Preview = connect(stateMap)(_Preview)