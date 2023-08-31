import {FC, useEffect} from "react";
import {useAppDispatch, useAppSelector} from "@/redux/hooks";
import {removeHover, setHover} from "@/arch/Grid/gridSlice";
import {Unit} from "@/arch/units/unitsSlice";

interface PinProps {
    id: number;
}

export const Pin: FC<PinProps> = (props) => {
    const dispatch = useAppDispatch();
    const pin = useAppSelector(state => state.grid.pins[props.id])
    const isBusy = pin.unitLink;

    useEffect(() => {
        // console.log(pin);
    }, [pin]);

    const onHover = () => {
        dispatch(setHover(props.id))
    }

    const onLeave = () => {
        dispatch(removeHover(props.id))
    }

    const getColor = (isBusy: Unit | null) => {
        return isBusy ? 'grey' : pin.color;
    }

    return (
        <svg style={{width: pin.radius * 2 + 'px', height: pin.radius * 2 + 'px'}}>
            <circle onMouseEnter={onHover} onMouseLeave={onLeave} cx={pin.cords.cx} cy={pin.cords.cy}
                    fill={pin.color} r={pin.radius}/>
        </svg>
    )
}