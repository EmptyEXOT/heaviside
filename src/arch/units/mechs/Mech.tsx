import React, {FC, useCallback, useEffect, useRef, useState} from 'react';
import {Unit} from "@/arch/units/unitsSlice";
import {MechProps} from "@/arch/units/mechs/types";
import Draggable, {ControlPosition} from "react-draggable";
import {selectGrid, selectPins, selectUnitSize, setBusy, setFree, toPx} from "@/arch/Grid/gridSlice";
import {CCords, Cords} from "@/arch/types/Cords";
import {useAppDispatch, useAppSelector} from "@/redux/hooks";
import cls from "@/arch/units/Unit/Unit.module.css";
import Slot from "@/arch/units/slots/Slot";
import PipeSlot from "@/arch/units/slots/pipeSlots/PipeSlot";


const Mech: FC<MechProps> = (props) => {
    const {
        select,
        size,
        img,
        setCords,
        slots,
    } = props

    const isGridDraggable = useAppSelector(state => state.grid.isDraggable)
    const draggableRef = useRef<Draggable>(null)
    const divRef = useRef<HTMLDivElement>(null)
    const unitSize = useAppSelector(selectUnitSize);
    const dispatch = useAppDispatch();
    const grid = useAppSelector(selectGrid)
    const pins = useAppSelector(selectPins);
    const [wasDragged, setWasDragged] = useState<boolean>(false);
    const [prevPos, setPrevPos] = useState<Cords>(select.cords);
    const [isIncorrectPos, setIsIncorrectPos] = useState<boolean>(false);
    const [isGoBack, setIsGoBack] = useState<boolean>(false);

    const makeBusy = () => {
        const busy: Array<CCords> = []
        const pos = select.cords;
        for (let i = pos.y; i <= size.height + pos.y; i++) {
            for (let k = pos.x; k <= size.width + pos.x; k++) {
                busy.push({cx: k, cy: i})
            }
        }
        busy.forEach(dot => {
            dispatch(setBusy({pos: dot, unit: select}))
        })
    }
    const isIncorrect = (cords: Cords, current: Unit) => {
        setIsIncorrectPos(false)
        for (let i = cords.y; i <= size.height + cords.y; i++) {
            for (let k = cords.x; k <= size.width + cords.x; k++) {
                if (pins[i][k].unitLink && pins[i][k].unitLink !== current) {
                    setIsIncorrectPos(true);
                    console.log('incorrect')
                }
            }
        }
    }
    const clearPins = (pos: Cords) => {
        console.log(pos)
        for (let i = pos.y; i <= size.height + pos.y; i++) {
            for (let k = pos.x; k <= size.width + pos.x; k++) {
                if (!isIncorrectPos)
                    dispatch(setFree({pos: {cy: i, cx: k}, unit: select}))
            }
        }
    }
    const onMouseLeave = useCallback((e: MouseEvent) => {
        console.log(e.clientX)
    }, [])
    const onMouseDown = () => {
        console.log('div.mouseDown.start');
        divRef.current.addEventListener('mouseleave', onMouseLeave, {once: true})
        divRef.current.style.zIndex = '100';
        setIsGoBack(false);
        setPrevPos(select.cords);
        console.log('prevPos: x=' + prevPos.x + ' y=' + prevPos.y)
        console.log('onMouseDown.select.cords: x=' + select.cords.x + ' y=' + select.cords.y)
        console.log('div.mouseDown.end')
    }
    const onMouseUp = () => {
        console.log('div.mouseUp.start')
        if (divRef.current) divRef.current.style.zIndex = '1'
        if (draggableRef.current && !isIncorrectPos) {
            console.log('clearPins')
            dispatch(setCords({
                id: select.id,
                cords: {x: draggableRef.current.state.x / 50, y: draggableRef.current.state.y / 50}
            }))
            clearPins(prevPos)
        } else setIsGoBack(true)
        setIsIncorrectPos(false)
        console.log('onMouseUp.select.cords: x=' + select.cords.x + ' y=' + select.cords.y)
        console.log('div.mouseUp.end')
    }
    useEffect(() => {
            isIncorrect({
                x: Number(draggableRef?.current?.state?.x) / 50,
                y: Number(draggableRef?.current?.state?.y) / 50
            }, select)
    }, [wasDragged]);
    useEffect(() => {
        makeBusy()
        if (isIncorrectPos) setIsGoBack(true)
        console.log('useEffect.select.cords x=' + select.cords.x + ' y=' + select.cords.y)
    }, [select.cords]);

    return (
        <Draggable
            onStop={() => {
                console.log('drag stop');
            }}
            ref={draggableRef}
            onDrag={() => {
                setWasDragged(!wasDragged)
                // console.log('onDrag.' + 'pos: ' + 'x=' + Number(draggableRef.current.state.x) / 50 + ' y=' + Number(draggableRef.current.state.y) / 50)
                console.log('drag')
            }}
            position={(isGoBack) ? {x: toPx(prevPos.x, 50), y: toPx(prevPos.y, 50)} as ControlPosition : undefined}
            disabled={isGridDraggable}
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
                ref={divRef}
                onMouseDownCapture={onMouseDown}
                onMouseUpCapture={onMouseUp}
                className={cls.unit} style={{
                backgroundColor: isIncorrectPos ? 'red' : img,
                top: 0,
                left: 0,
                width: toPx(size.width, unitSize),
                height: toPx(size.height, unitSize),
                cursor: "move"
            }}>
                {/*@ts-ignore*/}
                {slots?.map((slot, index) => <PipeSlot isNecessary={slot.isNecessary} position={{x: slot.position?.x, y: slot.position?.y}} id={index} unit={select} isBusy={slot.isBusy} key={index}></PipeSlot>)}
            </div>
        </Draggable>
    )
};

export default Mech;