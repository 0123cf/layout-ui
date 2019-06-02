import React, { ReactElement, useState, lazy, Suspense } from 'react'
import { createStore } from 'redux'
import { Provider } from 'react-redux'
import { TRowAST } from './types/index'
const UtilPanel = lazy(() => import('./components/util_panel'))
const DrawingPanel = lazy(() => import('./components/drawing_panel'))
const Previre = lazy(() => import('./components/components/preview'))
const PropertyeEdit = lazy(() => import('./components/propertye_edit'))
import { rootReducer } from './reducer/index'
const ProjectList = lazy(() => import('./projectList'))
const Index = lazy(() => import('./homeIndex'))
import { getUrlParams } from './utils/url'
import { createHtml } from './utils/utils'
import { projectAstListData } from './model/constant'

const store = createStore(rootReducer)

declare var window: any
window.Store = store

export const routes = [
    { path: '/index', page: () => <Suspense fallback={<div>Loading...</div>}><ProjectList /></Suspense> },
    {
        path: '/',
        page: () => {
            return <Suspense fallback={<div>Loading...</div>}><Index /></Suspense>
        }
    },
    {
        path: '/al',
        page: () => {
            let projectNameParam = getUrlParams('projectname')
            let projectName = `${projectAstListData}_${projectNameParam}`
            if (projectNameParam) {
                let ast: TRowAST[] = JSON.parse(localStorage[projectName])
                // TODO Verify ast
                store.dispatch({
                    type: 'previewHTML',
                    html: createHtml(ast).view,
                    ast
                })
            } else {
                store.dispatch({ type: 'clear' })
            }
            return <Provider store={store}>
                <div className="div_layout flex">
                    <Suspense fallback={<div>Loading...</div>}><UtilPanel /></Suspense>
                    <Suspense fallback={<div>Loading...</div>}><DrawingPanel /></Suspense>
                    <Suspense fallback={<div>Loading...</div>}><PropertyeEdit /></Suspense>
                    <Suspense fallback={<div>Loading...</div>}><Previre /></Suspense>
                </div>
            </Provider>
        }
    },
]
