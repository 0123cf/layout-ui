import * as React from 'react'
const { useState } = React
import { Preview } from './preview'
import {HandleColumn} from './handleColumn'
import {DebugLayout} from './debugLayout'

export const DivLayout = () => {
    return (
        <div className="div_layout flex">
            <HandleColumn />
            <DebugLayout />
            <Preview />
        </div>
    )
}