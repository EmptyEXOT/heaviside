import {FC, useCallback, useEffect} from "react";
import {useAppDispatch, useAppSelector} from "@/redux/hooks";
import {removeHover, selectPin, setColor, setHover} from "@/arch/Grid/gridSlice";
import {Unit} from "@/arch/units/unitsSlice";
import {CCords} from "@/arch/types/Cords";

interface PinProps {
    cords: CCords
}

export const Pin: FC<PinProps> = (props) => {
    const dispatch = useAppDispatch();
    const pin = useAppSelector(state => state.grid.pins[props.cords.cy][props.cords.cx])
    const isBusy = pin.unitLink;

    const getColor = (isBusy: Unit | null) => {
        console.log('color')
        return isBusy ? 'grey' : pin.color;
    }

    const onHover = () => {
        console.log('hover')
        dispatch(setHover(props.cords))
    }

    const onLeave = () => {
        dispatch(removeHover(props.cords))
    }

    useEffect(() => {
        dispatch(setColor({pos: {cx: props.cords.cx, cy: props.cords.cy}, color: 'gray'}))
    }, [isBusy]);

    return (
        <svg style={{width: pin.radius * 2 + 'px', height: pin.radius * 2 + 'px'}}>
            <circle onMouseEnter={onHover} cx={pin.cords.cx} cy={pin.cords.cy}
                    fill={isBusy ? 'gray' : 'green'} r={pin.radius}/>
        </svg>
    )
}