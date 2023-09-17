import type {PayloadAction} from '@reduxjs/toolkit'
import {createSlice} from '@reduxjs/toolkit'
import type {RootState} from '@/redux/store'
import {Size} from "@/arch/types/Size";
import {CCords, Cords} from "@/arch/types/Cords";
import cfg from '../arch.config.json'
import {Unit} from "@/arch/units/unitsSlice";
import {useAppSelector} from "@/redux/hooks";

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
    pins: Array<Array<IPin>>,
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
    isDraggable: false,
}

function initPins(): Array<Array<IPin>> {
    let counter = 0;
    const pinArr: Array<Array<IPin>> = []
    const width = cfg.grid.size.width
    const height = cfg.grid.size.height
    for (let y = 0; y < height; y++) {
        pinArr.push([]);
        for (let x = 0; x < width; x++) {
            pinArr[y].push({
                cords: {cx: (x * cfg.grid.unitSize), cy: (y * cfg.grid.unitSize)},
                id: counter++,
                radius: 4,
                color: "blue",
                state: {hover: false},
                unitLink: null
            })
        }
    }
    return pinArr;
}

export const getPinByCords = (pins: Array<Array<IPin>>, cords: CCords, unitSize: number) => {
    // const pin = pins.find(pin => pin.cords.cx === toPx(cords.cx, unitSize) && pin.cords.cy === toPx(cords.cy, unitSize))
    // if (pin)
    //     return pin.id
    return pins[cords.cy][cords.cx].id
}


export const gridSlice = createSlice({
    name: 'grid',
    initialState,
    reducers: {
        setBusy: (state, action: PayloadAction<{ pos: CCords, unit: Unit }>) => {
            state.pins[action.payload.pos.cy][action.payload.pos.cx].unitLink = action.payload.unit
            console.log('setBusy')
            // console.log('set busy for: ')
            // console.log(action.payload.pos.cy, ' ', action.payload.pos.cx)
        },
        setColor: (state, action: PayloadAction<{ pos: CCords, color: string }>) => {
            if (state.pins[action.payload.pos.cy][action.payload.pos.cx].unitLink) {
                state.pins[action.payload.pos.cy][action.payload.pos.cx].color = action.payload.color
                console.log('setColor')
            }
        },
        setFree: (state, action: PayloadAction<{ pos: CCords, unit: Unit }>) => {
            state.pins[action.payload.pos.cy][action.payload.pos.cx].unitLink = null
        },
        setHover: (state, action: PayloadAction<CCords>) => {
            state.pins[action.payload.cy][action.payload.cx].state.hover = true
        },
        removeHover: (state, action: PayloadAction<CCords>) => {
            state.pins[action.payload.cy][action.payload.cx].state.hover = false
        },
        setIsDraggable: (state, action: PayloadAction<boolean>) => {
            state.isDraggable = action.payload
        },
        getPinByCords: (state, action: PayloadAction<CCords>) => {


        },
    },
})

export const {setFree, setColor, setBusy, setHover, removeHover, setIsDraggable} = gridSlice.actions

export const selectGrid = (state: RootState) => state.grid
export const selectPins = (state: RootState) => state.grid.pins
export const selectUnitSize = (state: RootState) => state.grid.unitSize
export const selectIsDraggable = (state: RootState) => state.grid.isDraggable
export const selectPin = (state: RootState) => state.grid.pins

export default gridSlice.reducer