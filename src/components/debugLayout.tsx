import * as React from 'react'
import {connect} from 'react-redux'
const { useState } = React

interface Tprops{
    html: string
}

const _DebugLayout = (props: Tprops) => {
    return <div className="DebugLayout">
        <span>DebugLayout</span>
        <div className="view-box" dangerouslySetInnerHTML={{__html: props.html}}></div>
    </div>
}
const stateMap = (state: any):Tprops => {
    return {
        html: state.previewHTML
    }
}
export const DebugLayout = connect(stateMap)(_DebugLayout)