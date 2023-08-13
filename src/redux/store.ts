import {configureStore} from "@reduxjs/toolkit";
import GridReducer from '../arch/Grid/gridSlice'
import PinReducer from '../arch/Grid/Pin/pinSlice'

export const store = configureStore({
    devTools: true,
    reducer: {
        grid: GridReducer,
        pin: PinReducer,
    },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch