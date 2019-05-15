import * as React from 'react'
import * as ReactDOM from 'react-dom'
import {createStore} from 'redux'
import {Provider} from 'react-redux'

import  './style.scss'
import 'antd/dist/antd.css'
import {DivLayout} from './components'
import {rootReducer} from './reducer/index'

const store = createStore(rootReducer)

ReactDOM.render(
   <Provider store={store}>
      <DivLayout />
   </Provider>,
   document.getElementById('root')
)