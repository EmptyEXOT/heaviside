import {createSlice} from "@reduxjs/toolkit";
import {Pipe} from "@/arch/units/pipes/types";
import cfg from '../../arch.config.json'
import {RootState} from "@/redux/store";
interface PipelinesState {
    list: Array<Pipe>
}

const initialState: PipelinesState = {
    list: cfg.pipelines.default
}

const pipelinesSlice = createSlice({
    name: 'pipelines',
    initialState,
    reducers: {
        setsmth: (state, action) => {

        }
    },
})

export const selectPipelineById = (id: number) => (state: RootState) => state.pipelines.list[id]


export default pipelinesSlice.reducer