import {CaseReducer, PayloadAction} from "@reduxjs/toolkit";
import {Cords} from "@/arch/types/Cords";
import {MechStateType} from "@/arch/units/mechs/types";


export const createSetCords = function<T extends MechStateType>(): CaseReducer<T, PayloadAction<{ id: number, cords: Cords }>> {
    return (state, action) => {
        state.list[action.payload.id].cords = action.payload.cords
    }
}

