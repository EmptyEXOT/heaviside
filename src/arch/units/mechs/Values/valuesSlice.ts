import {createSlice} from "@reduxjs/toolkit";
import {Unit} from "@/arch/units/unitsSlice";
import cfg from '@/arch/arch.config.json'
import {createSetCords} from "@/arch/units/mechs/helpers/useSetCords";

export interface Value extends Unit {

}

export interface ValuesState {
    list: Array<Value>
}

const initialState: ValuesState = {
    list: cfg.units.mechs.values
}

const valuesSlice = createSlice({
    name: 'values',
    initialState,
    reducers: {
        setValueCords: createSetCords<ValuesState>(),
    }
})

export const {setValueCords} = valuesSlice.actions;

export default valuesSlice.reducer