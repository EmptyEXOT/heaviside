'use client'

import {FC, useEffect, useState} from "react";
import {useAppDispatch, useAppSelector} from "@/redux/hooks";
import {Size} from "@/arch/types/Size";
import {Pin} from "@/arch/Grid/Pin/Pin";
import {Cords} from "@/arch/types/Cords";
import Viewport from "@/arch/Viewport/Viewport";

interface GridProps {

}

export const Grid: FC<GridProps> = (props) => {
    const grid = useAppSelector(state => state.grid)


    return (

            <div style={{width: grid.size.width+'px', height: grid.size.height+'px'}}>
                <svg style={{width: 100+'%', height: 100+'%'}}>
                    {
                        grid.pins.map((pin) =>
                            <Pin key={pin.id} id={pin.id}/>
                        )
                    }
                </svg>

            </div>


    )
}