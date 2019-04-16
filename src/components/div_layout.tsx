import * as React from 'react'
const { Component, useState } = React
import { Preview } from './preview'
import {HandleColumn} from './handleColumn'
import {DebugLayout} from './debugLayout'

interface DivLayoutPro {
    name: string
}

export const DivLayout = (props: DivLayoutPro) => {
    let [computedHtml, setcomputedHtml] = useState('')
    let [debugHtml, setdebugHtml] = useState('')
    let sethtml = (html: string): void => {
        setcomputedHtml(html)
    }
    let _setdebugHtml = (html: string): void => {
        setdebugHtml(html)
    }
    return (
        <div className="div_layout flex">
            <HandleColumn sethtml={sethtml} setdebugHtml={_setdebugHtml} />
            <DebugLayout html={debugHtml} />
            <Preview html={computedHtml} />
        </div>
    )
}