
import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import type { RootState } from '@/redux/store'
import {Size} from "@/arch/types/Size";
import {ReactNode} from "react";
import {Cords} from "@/arch/types/Cords";

interface PinState {
    hover: boolean;
}

interface IPin {
    id: number;
    cords: Cords,
    isBusy: boolean,
    radius: number,
    color: string,
    state: PinState,
}

interface GridState {
    size: Size,
    unitSize: number,
    pins: Array<IPin>,
}

// Define the initial state using that type
const initialState: GridState = {
    size: {
        height: 500,
        width: 500,
    },
    unitSize: 50,
    pins: initPins(),

}

function initPins(): Array<IPin> {
    let counter = 0;
    const pinArr: Array<IPin> = []
    const width = 10
    const height = 10
    for (let i = 0; i < width; i++) {
        for (let k = 0; k < height; k++) {
            pinArr.push({cords: {cx: i * 50, cy: k * 50}, isBusy: false, id: counter++, radius: 7, color: "blue", state: {hover: false}})
        }
    }
    console.log(pinArr);
    return pinArr;
}

export const gridSlice = createSlice({
    name: 'grid',
    initialState,
    reducers: {
        setBusy: (state, action: PayloadAction<number>) => {
            state.pins[action.payload].isBusy = true
        },
        setHover: (state, action: PayloadAction<number>) => {
            state.pins[action.payload].state.hover = true
        },
        removeHover: (state, action: PayloadAction<number>) => {
            state.pins[action.payload].state.hover = false
        },
    },
})

export const { setBusy, setHover, removeHover } = gridSlice.actions

// Other code such as selectors can use the imported `RootState` type
export const selectGrid = (state: RootState) => state.grid

export default gridSlice.reducer