import {FC, useEffect, useRef, useState} from "react";
import {useAppDispatch, useAppSelector} from "@/redux/hooks";
import {collapse, expand} from "@/arch/Grid/Pin/pinSlice";
import {Cords} from "@/arch/types/Cords";
import {removeHover, setHover} from "@/arch/Grid/gridSlice";

interface PinProps {
    id: number;
}

export const Pin: FC<PinProps> = (props) => {
    const dispatch = useAppDispatch();
    const pin = useAppSelector(state => state.grid.pins[props.id])

    useEffect(() => {
        console.log(pin);
    }, [pin]);

    const onHover = () => {
        dispatch(setHover(props.id))
    }

    const onLeave = () => {
        dispatch(removeHover(props.id))
    }

    return (
        <svg style={{width: pin.radius * 2 + 'px', height: pin.radius * 2 + 'px'}}>
            <circle onMouseEnter={onHover} onMouseLeave={onLeave} cx={pin.cords.cx} cy={pin.cords.cy}
                    fill={pin.color} r={pin.radius}/>
        </svg>
    )
}