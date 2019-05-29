import React, {ReactElement, useState} from 'react'
import { createStore } from 'redux'
import { Provider } from 'react-redux'

import UtilPanel from './components/util_panel'
import DrawingPanel from './components/drawing_panel'
import PropertyeEdit from './components/propertye_edit'
import Previre from './components/components/preview'
import { rootReducer } from './reducer/index'
import ProjectList from './projectList'
import Index from './homeIndex'
import { getUrlParams } from './utils/url'
import { createHtml } from './utils/utils'
import { projectAstListData } from './model/constant'

const store = createStore(rootReducer)

declare var window: any
window.Store = store

export const routes = [
    { path: '/index', page: () => <ProjectList /> },
    { 
        path: '/',
        page: () => {
            return <Index />
        }
    },
    {
        path: '/al',
        page: () => {
            let projectNameParam = getUrlParams('projectname')            
            let projectName = `${projectAstListData}_${projectNameParam}`
            if(projectNameParam){
                let ast = JSON.parse(localStorage[projectName])
                // TODO Verify ast
                store.dispatch({
                    type: 'previewHTML',
                    html: createHtml(ast).view,
                    ast
                })
            }else{
                store.dispatch({ type: 'clear' })
            }
            return <Provider store={store}>
                <div className="div_layout flex">
                    <UtilPanel />
                    <DrawingPanel />
                    <PropertyeEdit />
                    <Previre />
                </div>
            </Provider>
        }
    },
]
