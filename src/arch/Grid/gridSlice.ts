import type {PayloadAction} from '@reduxjs/toolkit'
import {createSlice} from '@reduxjs/toolkit'
import type {RootState} from '@/redux/store'
import {Size} from "@/arch/types/Size";
import {CCords, Cords} from "@/arch/types/Cords";
import cfg from '../arch.config.json'

interface PinState {
    hover: boolean;
}

interface IPin {
    id: number;
    cords: CCords,
    isBusy: boolean,
    radius: number,
    color: string,
    state: PinState,
}

interface GridState {
    size: Size,
    unitSize: number,
    pins: Array<IPin>,
    isDraggable: boolean
}

export function toPx(value: number, multiplier: number, px: boolean = false) {
    if (px) return (value * multiplier) + 'px';
    else return value * multiplier;
}

const initialState: GridState = {
    size: {
        height: cfg.grid.size.height,
        width: cfg.grid.size.width,
    },
    unitSize: cfg.grid.unitSize,
    pins: initPins(),
    isDraggable: true,
}

function initPins(): Array<IPin> {
    let counter = 0;
    const pinArr: Array<IPin> = []
    const width = cfg.grid.size.width
    const height = cfg.grid.size.height
    for (let x = 1; x < height; x++) {
        for (let y = 1; y < width; y++) {
            pinArr.push({
                cords: {cx: (y * cfg.grid.unitSize), cy: (x * cfg.grid.unitSize)},
                isBusy: false,
                id: counter++,
                radius: 7,
                color: "blue",
                state: {hover: false}
            })
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
        setFree: (state, action: PayloadAction<number>) => {
            state.pins[action.payload].isBusy = false
        },
        setHover: (state, action: PayloadAction<number>) => {
            state.pins[action.payload].state.hover = true
        },
        removeHover: (state, action: PayloadAction<number>) => {
            state.pins[action.payload].state.hover = false
        },
        setIsDraggable: (state, action: PayloadAction<boolean>) => {
            state.isDraggable = action.payload
        }
    },
})

export const {setBusy, setHover, removeHover, setIsDraggable} = gridSlice.actions

export const selectGrid = (state: RootState) => state.grid
export const selectPins = (state: RootState) => state.grid.pins
export const selectUnitSize = (state: RootState) => state.grid.unitSize
export const selectIsDraggable = (state: RootState) => state.grid.isDraggable

export default gridSlice.reducer