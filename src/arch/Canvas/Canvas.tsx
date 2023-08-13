import React, {FC, MouseEventHandler, ReactNode, useEffect, useRef, useState} from 'react';
import cls from './Canvas.module.css'
import Draggable, {DraggableEventHandler} from 'react-draggable';

interface CanvasProps {
    children: ReactNode,
}

enum Axis {
    Both = 'both',
    X = 'x',
    Y = 'y',
    None = 'none'
}

const Canvas: FC<CanvasProps> = (props) => {
    const [axis, setAxis] = useState<Axis>(Axis.Both)
    const ref = useRef<Draggable>(null)

    const limits = {
        start: -100,
        end: 0,
        top: -200,
        bottom: 0,
    }

    return (
        <Draggable
            grid={[25, 25]}
            axis={axis}
            bounds={{top: limits.top, bottom: limits.bottom, left: limits.start, right: limits.end}}
            ref={ref}
            scale={1}
        >
            <div className={cls.canvas}>
                {props.children}
            </div>
        </Draggable>
    );
};

export default Canvas;