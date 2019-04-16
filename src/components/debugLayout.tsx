import * as React from 'react'
const { Component, useState } = React

interface DebugLayoutPro {
    html: string
}
export const DebugLayout = (props: DebugLayoutPro) => {
    return <div className="DebugLayout">
        <span>DebugLayout</span>
    </div>
} 