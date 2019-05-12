import * as React from 'react'
import UtilPanel from './util_panel'
import DrawingPanel from './drawing_panel'
import PropertyeEdit from './propertye_edit'

export const DivLayout = () => {
    return (
        <div className="div_layout flex">
            <UtilPanel />
            <DrawingPanel />
            <PropertyeEdit />
        </div>
    )
}