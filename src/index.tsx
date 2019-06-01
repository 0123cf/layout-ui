import React, { ReactElement } from 'react'
import * as ReactDOM from 'react-dom'
import { routes } from './router'
import { Troute } from './types/index'

const Main = (root: HTMLElement | null) => {
   let getPath = (url: string): string => {
      let href = url.split('#')[1]
      return href ? href.split('?')[0] : '/'
   }
   let getView = (urlPath: string) => {
      let pageInfo = routes.find((route: Troute) => route.path === urlPath)
      let pagePath = pageInfo ? pageInfo.path : ''
      return <div>
         {
            routes.map(e => {
               let view: ReactElement | Boolean
               if (e.path === pagePath) {
                  view = e.page()
               } else {
                  view = false
               }
               return view
            }).filter(e => e)
         }
      </div>
   }
   window.onhashchange = (e: HashChangeEvent) => {
      ReactDOM.render(getView(getPath(e.newURL)), root)
   }
   ReactDOM.render(getView(getPath(location.href)), root)
}

Main(
   document.getElementById('root')
)