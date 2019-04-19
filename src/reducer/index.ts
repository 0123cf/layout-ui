import {TRowAST, Tstore} from '../types/index'

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
    previewAST: [],
    selectRowPath: []
}

export const rootReducer = (state = defaultState, action: Tactive): Tstore  =>{
    switch(action.type){
        case 'previewHTML': {
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