import {createSlice} from "@reduxjs/toolkit";
import {Unit} from "@/arch/units/unitsSlice";
import cfg from '../../../arch.config.json'
import {createSetCords} from "@/arch/units/mechs/helpers/useSetCords";
import {PipeSlot} from "@/arch/units/slots/pipeSlots/types/PipeSlot";

interface Smelter extends Unit {
    slots: {
        pipe: Array<PipeSlot>
    };
}

export interface SmeltersState {
    list: Array<Smelter>
}

const initialState: SmeltersState = {
    list: cfg.units.mechs.smelters
}

const smeltersSlice = createSlice({
    name: 'smelters',
    initialState,
    reducers: {
        setSmelterCords: createSetCords<SmeltersState>()
    }
})

export const {setSmelterCords} = smeltersSlice.actions;

export default smeltersSlice.reducer