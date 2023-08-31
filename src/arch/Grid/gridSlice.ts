import type {PayloadAction} from '@reduxjs/toolkit'
import {createSlice} from '@reduxjs/toolkit'
import type {RootState} from '@/redux/store'
import {Size} from "@/arch/types/Size";
import {CCords, Cords} from "@/arch/types/Cords";
import cfg from '../arch.config.json'
import {Unit} from "@/arch/units/unitsSlice";

interface PinState {
    hover: boolean;
}

interface IPin {
    id: number;
    cords: CCords,
    radius: number,
    color: string,
    state: PinState,
    unitLink: Unit | null
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
                id: counter++,
                radius: 7,
                color: "blue",
                state: {hover: false},
                unitLink: null
            })
        }
    }
    return pinArr;
}

export const getPinByCords = (pins: Array<IPin>, cords: CCords, unitSize: number) => {
    const pin = pins.find(pin => pin.cords.cx === toPx(cords.cx, unitSize) && pin.cords.cy === toPx(cords.cy, unitSize))
    if (pin)
        return pin.id
}

export const gridSlice = createSlice({
    name: 'grid',
    initialState,
    reducers: {
        setBusy: (state, action: PayloadAction<{ id: number | undefined, unit: Unit }>) => {
            if (action.payload.id) {
                state.pins[action.payload.id].unitLink = action.payload.unit
                state.pins[action.payload.id].color = 'yellow'
            }
        },
        setFree: (state, action: PayloadAction<{ id: number, unit: Unit }>) => {
            state.pins[action.payload.id].unitLink = null
        },
        setHover: (state, action: PayloadAction<number>) => {
            state.pins[action.payload].state.hover = true
        },
        removeHover: (state, action: PayloadAction<number>) => {
            state.pins[action.payload].state.hover = false
        },
        setIsDraggable: (state, action: PayloadAction<boolean>) => {
            state.isDraggable = action.payload
        },
        getPinByCords: (state, action: PayloadAction<Cords>) => {


        },
    },
})

export const {setBusy, setHover, removeHover, setIsDraggable} = gridSlice.actions

export const selectGrid = (state: RootState) => state.grid
export const selectPins = (state: RootState) => state.grid.pins
export const selectUnitSize = (state: RootState) => state.grid.unitSize
export const selectIsDraggable = (state: RootState) => state.grid.isDraggable

export default gridSlice.reducer