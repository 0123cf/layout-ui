import {TRowAST, Tstore} from '../types/index'
import {TEST_ast} from '../test/model/ast'

interface TpreviewActive {
    type: string,
    html: string,
    ast: TRowAST[]
}
interface TbaseActive {
    type: string,
    value: string,
}
interface TselectRowPath {
    type: string,
    path: number[],
}
interface Tactive extends TbaseActive, TselectRowPath, TpreviewActive{}

const defaultState: Tstore = {
    previewHTML: '',
    // previewAST: TEST_ast,
    // selectRowPath: [2,0,0],
    previewAST: [],
    selectRowPath: []
}

export const rootReducer = (state = defaultState, action: Tactive): Tstore  =>{
    switch(action.type){
        case 'previewHTML': {
            // console.log(JSON.stringify(action.ast))
            return {...state,
                previewHTML: action.html,
                previewAST: action.ast
            }
        }
        case 'selectRowPath': {
            return {...state,
                selectRowPath: action.path,
            }
        }
        default :{
            return state
        }
    }
}