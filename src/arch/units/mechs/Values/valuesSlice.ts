import {CaseReducer, createAction, createSlice, PayloadAction} from "@reduxjs/toolkit";
import {Unit} from "@/arch/units/unitsSlice";
import {createReducer} from "@reduxjs/toolkit/src";
import {Cords} from "@/arch/types/Cords";
import cfg from '@/arch/arch.config.json'

export interface Value extends Unit {

}

interface ValuesState {
    list: Array<Value>
}

const initialState: ValuesState = {
    list: cfg.units.mechs.values
}

// export const setCords = createAction<{ id: number, cords: Cords }>('value/setCords')
//
// export const valuesReducer = createReducer(initialState, (builder) => {
//     builder
//         .addCase(setCords, (state, action) => {
//             state.list[action.payload.id].cords = action.payload.cords
//         })
// })

const setCordsReducer: CaseReducer<ValuesState, PayloadAction<{ id: number, cords: Cords }>> = (state, action) => {
    state.list[action.payload.id].cords = action.payload.cords
}

const valuesSlice = createSlice({
    name: 'values',
    initialState,
    reducers: {
        setCords: setCordsReducer,
    }
})

export const {setCords} = valuesSlice.actions;

export default valuesSlice.reducer