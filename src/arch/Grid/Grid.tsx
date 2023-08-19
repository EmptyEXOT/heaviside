'use client'

import {FC} from "react";
import {useAppSelector} from "@/redux/hooks";
import {Pin} from "@/arch/Grid/Pin/Pin";
import {selectGrid, selectPins, toPx} from "@/arch/Grid/gridSlice";
import cls from './Grid.module.css'

interface GridProps {

}

export const Grid: FC<GridProps> = (props) => {
    const grid = useAppSelector(selectGrid)
    const pins = useAppSelector(selectPins)
    return (

        <div style={{
            width: toPx(grid.size.width, grid.unitSize, true),
            height: toPx(grid.size.height, grid.unitSize, true),
        }}>
            <svg className={cls.pinWrapper}>
                {
                    pins.map((pin) =>
                        <Pin key={pin.id} id={pin.id}/>
                    )
                }
            </svg>

        </div>
    )
}