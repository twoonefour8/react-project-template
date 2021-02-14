import {combineReducers} from 'redux'
import {templateReducer} from './template.reducer'

export const rootReducer = combineReducers({
    template: templateReducer
})