import React, {FC, useEffect, useRef} from 'react';
import {useAppDispatch, useAppSelector} from "@/redux/hooks";
import Draggable from "react-draggable";
import cls from "@/arch/units/Unit/Unit.module.css";
import {
    getPinByCords,
    selectGrid,
    selectPins,
    selectUnitSize,
    setBusy,
    setIsDraggable,
    toPx
} from "@/arch/Grid/gridSlice";
import {setCords} from "@/arch/units/mechs/Values/valuesSlice";
import {Size} from "@/arch/types/Size";
import {CCords, Cords} from "@/arch/types/Cords";

interface ValueProps {
    id: number;
}

const Value: FC<ValueProps> = (props) => {
    const ref = useRef<Draggable>(null)
    const select = useAppSelector(state => state.mechs.values.list)[props.id]
    const unitSize = useAppSelector(selectUnitSize);
    const dispatch = useAppDispatch();
    const grid = useAppSelector(selectGrid)
    const pins = useAppSelector(selectPins);

    const size: Size = {
        width: 2,
        height: 3
    }

    useEffect(() => {
        const busy: Array<CCords> = []
        const pos = select.cords;
        for (let i = pos.y; i <= size.height+pos.y; i++) {
            for (let k = pos.x; k <= size.width+pos.x; k++) {
                busy.push({cx: k, cy: i})
            }
        }

        busy.forEach(dot => {
            console.log(getPinByCords(pins, dot, unitSize));
            dispatch(setBusy({id: getPinByCords(pins, dot, unitSize), unit: select}))
        })
    }, []);

    const onMouseDown = () => {
        dispatch(setIsDraggable(false))
    }



    const onMove = () => {
        if (ref.current)
            dispatch(setCords({id: props.id, cords: {x: ref.current.state.x / 50, y: ref.current.state.y / 50}}))
        console.log(Number(toPx(grid.size.width, unitSize)));
    }

    const onMouseUp = () => {
        dispatch(setIsDraggable(true))
    }
    return (
        <Draggable
            ref={ref}
            onStop={() => {
                onMove();
                console.log(select)
            }}
            defaultPosition={{x: Number(toPx(select.cords.x, unitSize)), y: Number(toPx(select.cords.y, unitSize))}}
            grid={[unitSize, unitSize]}
            bounds={{
                top: Number(toPx(1, unitSize)),
                left: Number(toPx(1, unitSize)),
                right: Number(toPx(grid.size.width - 1 - size.width, unitSize)),
                bottom: Number(toPx(grid.size.height - 1 - size.height, unitSize))
            }}
        >
            <div
                onMouseDownCapture={onMouseDown}
                onMouseUpCapture={onMouseUp}
                onMouseLeave={onMouseUp}
                className={cls.unit} style={{
                top: 0,
                left: 0,
                width: toPx(size.width, unitSize),
                height: toPx(size.height, unitSize),
                cursor: "move"
            }}/>

        </Draggable>

    );
};

export default Value;