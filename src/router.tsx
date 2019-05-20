import React, {ReactElement} from 'react'
import * as ReactDOM from 'react-dom'
import { createStore } from 'redux'
import { Provider } from 'react-redux'

import UtilPanel from './components/util_panel'
import DrawingPanel from './components/drawing_panel'
import PropertyeEdit from './components/propertye_edit'
import { rootReducer } from './reducer/index'
import ProjectList from './projectList'
import { Troutes, Troute } from './types/index'

const store = createStore(rootReducer)

declare var window: any
window.Store = store

const router = (routes: Troutes): ReactElement => {
    let href = location.href.split('#')[1]
    let routePath = href ? href.split('?')[0] : '/'
    let page = routes.find((route: Troute) => route.path === routePath)
    if(page){
        return page.page
    }else{
        return <div>找不到页面哦QAQ</div>
    }
}

export const route = () => {
    return router(
        [
            { path: '/', page: <ProjectList /> },
            {
            path: '/al', page: <Provider store={store}>
                <div className="div_layout flex">
                    <UtilPanel />
                    <DrawingPanel />
                    <PropertyeEdit />
                </div>
            </Provider>
            },
        ]
    )
}