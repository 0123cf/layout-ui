interface TRowAST {
    tag: string,
    css: string[],
    style: any[],
    innerText?: string,
    children: TRowAST[]
}

interface Tstore {
    previewHTML: string,
    previewAST: TRowAST[],
}

interface TpreviewActive {
    type: string,
    html: string,
    ast: TRowAST[]
}
type Tactive = TpreviewActive

const defaultState: Tstore = {
    previewHTML: '',
    previewAST: []
}

export const rootReducer = (state = defaultState, action: Tactive): Tstore  =>{
    switch(action.type){
        case 'previewHTML': {
            return {...state,
                previewHTML: action.html,
                previewAST: action.ast
            }
        }
        default :{
            return state
        }
    }
}