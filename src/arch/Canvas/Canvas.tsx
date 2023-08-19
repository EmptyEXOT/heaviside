import React, {FC, ReactNode} from 'react';
import cls from './Canvas.module.css'
import Draggable from 'react-draggable';
import {useAppSelector} from "@/redux/hooks";
import {selectBounds, selectStartPos} from "@/arch/Canvas/canvasSlice";
import {selectIsDraggable} from "@/arch/Grid/gridSlice";

interface CanvasProps {
    children: ReactNode
}

const Canvas: FC<CanvasProps> = (props) => {
    const bounds = useAppSelector(selectBounds)
    const startPos = useAppSelector(selectStartPos)
    const isDisabled = !useAppSelector(selectIsDraggable);

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