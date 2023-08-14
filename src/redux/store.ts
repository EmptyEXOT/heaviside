import {configureStore} from "@reduxjs/toolkit";
import GridReducer from '../arch/Grid/gridSlice'
import CanvasReducer from '../arch/Canvas/canvasSlice'
export const store = configureStore({
    devTools: true,
    reducer: {
        grid: GridReducer,
        canvas: CanvasReducer
    },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch