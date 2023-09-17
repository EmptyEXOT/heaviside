import {combineReducers} from "redux";
import ValuesReducer from './Values/valuesSlice'
import SmeltersSlice from "./Smelter/smeltersSlice";

const mechReducer = combineReducers({
    values: ValuesReducer,
    smelters: SmeltersSlice,
})
export default mechReducer