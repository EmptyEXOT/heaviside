import {createSlice} from "@reduxjs/toolkit";
import {Cords} from "@/arch/types/Cords";
import cfg from '../arch.config.json';

export interface Unit {
    id: number;
    cords: Cords;
}
