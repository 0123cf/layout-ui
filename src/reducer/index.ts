import { TRowAST, Tstore } from '../types/index'
// import { TEST_ast } from '../test/model/ast'

interface TpreviewActive {
    type: string,
    html?: string,
    ast?: TRowAST[]
}
interface TbaseActive {
    type: string,
    value?: any,
}
interface TselectRowPath {
    type: string,
    path?: number[],
}
interface Tactive extends TbaseActive, TselectRowPath, TpreviewActive { }

const defaultState: Tstore = {
    previewHTML: '',
    previewAST: [],
    selectRowPath: [],
    showPreview: false
}

export const rootReducer = (state = defaultState, action: Tactive): Tstore => {
    switch (action.type) {
        case 'previewHTML': {
            return {
                ...state,
                previewHTML: action.html ? action.html : '',
                previewAST: action.ast ? action.ast : []
            }
        }
        case 'selectRowPath': {
            return {
                ...state,
                selectRowPath: action.path ? action.path : [],
            }
        }
        case 'showPreview': {
            return {
                ...state,
                showPreview: action.value,
            }
        }
        case 'clear': {
            return { ...defaultState }
        }
        default: {
            return state
        }
    }
}