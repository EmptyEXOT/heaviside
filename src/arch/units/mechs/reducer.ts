import {combineReducers} from "redux";
import ValuesReducer from './Values/valuesSlice'

const mechReducer = combineReducers({
    values: ValuesReducer
})
export default mechReducer