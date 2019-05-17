import * as React from 'react'
import * as ReactDOM from 'react-dom'
import {createStore} from 'redux'
import {Provider} from 'react-redux'

import UtilPanel from './components/util_panel'
import DrawingPanel from './components/drawing_panel'
import PropertyeEdit from './components/propertye_edit'
import {rootReducer} from './reducer/index'

const store = createStore(rootReducer)

ReactDOM.render(
   <Provider store={store}>
      <div className="div_layout flex">
         <UtilPanel />
         <DrawingPanel />
         <PropertyeEdit />
      </div>
   </Provider>,
   document.getElementById('root')
)