import React, {FC, ReactNode, useCallback, useEffect, useState} from 'react';
import cls from './Canvas.module.css'
import Draggable from 'react-draggable';
import {useAppDispatch, useAppSelector} from "@/redux/hooks";
import {selectBounds, selectStartPos} from "@/arch/Canvas/canvasSlice";
import {selectIsDraggable, setIsDraggable} from "@/arch/Grid/gridSlice";
import useGlobalDOMEvents from "@/arch/Canvas/useGlobalDOMEffect";

interface CanvasProps {
    children: ReactNode
}

const Canvas: FC<CanvasProps> = (props) => {
    const bounds = useAppSelector(selectBounds)
    const startPos = useAppSelector(selectStartPos)
    const isDisabled = !useAppSelector(selectIsDraggable);
    const dispatch = useAppDispatch();
    const isDraggable = useAppSelector(selectIsDraggable)
    const [isPressed, setIsPressed] = useState(false)

    useGlobalDOMEvents({
        keydown(e: KeyboardEvent) {
            if (e.code == 'Space') {
                setIsPressed(true)
            }
        }
    })

    useGlobalDOMEvents({
        keyup() {
            console.log('up')
            setIsPressed(false)
        }
    })

    useEffect(() => {
        console.log(isPressed)
        isPressed ? dispatch(setIsDraggable(true)) : dispatch(setIsDraggable(false))
    }, [isPressed]);

    return (
        <Draggable
            bounds={bounds}
            defaultPosition={{y: startPos.y, x: startPos.x}}
            disabled={isDisabled}
        >
            <div className={cls.canvas}>
                {props.children}
            </div>
        </Draggable>
    );
};

export default Canvas;