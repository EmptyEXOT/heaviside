import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {Size} from "@/arch/types/Size";
import {Cords} from "@/arch/types/Cords";
import {RootState} from "@/redux/store";
import cfg from '../arch.config.json'

type StartCords = Pick<Cords, 'x' | 'y'>

interface CanvasState {
    size: Size;
    startPos: StartCords;
    bounds?: Bounds
}

interface Bounds {
    top: number,
    right: number,
    bottom: number,
    left: number,
}

const initialState: CanvasState = {
    size: {height: (cfg.grid.size.height) * cfg.grid.unitSize, width: (cfg.grid.size.width) * cfg.grid.unitSize},
    startPos: {x: cfg.startPos.x, y: cfg.startPos.y},
}

const canvasSlice = createSlice({
    name: 'canvas',
    initialState,
    reducers: {
        calculateBounds: (state, action: PayloadAction<Size>) => {
            state.bounds = {
                top: action.payload.height - state.size.height,
                bottom: 0,
                left: action.payload.width - state.size.width,
                right: 0
            }
        }
    }
})

export const {calculateBounds} = canvasSlice.actions

export const selectBounds = (state: RootState) => state.canvas.bounds
export const selectStartPos = (state: RootState) => state.canvas.startPos

export default canvasSlice.reducer