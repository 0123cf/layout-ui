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
    let sethtml = (html: string): void => {
        setcomputedHtml(html)
    }
    return (
        <div className="div_layout flex">
            <HandleColumn sethtml={sethtml} />
            <DebugLayout html={computedHtml} />
            <Preview html={computedHtml} />
        </div>
    )
}