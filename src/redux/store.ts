import {configureStore} from "@reduxjs/toolkit";
import GridReducer from '../arch/Grid/gridSlice'
import CanvasReducer from '../arch/Canvas/canvasSlice'
import MechReducer from '../arch/units/mechs/reducer'
import PipelinesReducer from '../arch/units/pipes/pipelinesSlice'

export const store = configureStore({
    devTools: true,
    reducer: {
        grid: GridReducer,
        canvas: CanvasReducer,
        mechs: MechReducer,
        pipelines: PipelinesReducer,
    },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch