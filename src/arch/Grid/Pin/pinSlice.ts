import {Size} from "@/arch/types/Size";
import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {RootState} from "@/redux/store";

interface PinState {
    isExpand: boolean,
    color: string,
    radius: number,
}

// Define the initial state using that type
const initialState: PinState = {
    color: 'blue',
    isExpand: false,
    radius: 10,
}

export const pinSlice = createSlice({
    name: 'pin',
    initialState,
    reducers: {
        expand: (state) => {
            state.isExpand = true;
            state.radius = 20;
        },
        collapse: (state) => {
            state.isExpand = false;
            state.radius = 10
        }
    },
})

export const {expand, collapse} = pinSlice.actions

// Other code such as selectors can use the imported `RootState` type
export const selectPin = (state: RootState) => state.pin

export default pinSlice.reducer