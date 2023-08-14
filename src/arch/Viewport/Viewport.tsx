import React, {FC, ReactNode, useEffect, useRef, useState} from 'react';
import cls from './Viewport.module.css'
import {useAppDispatch, useAppSelector} from "@/redux/hooks";
import {calculateBounds} from "@/arch/Canvas/canvasSlice";

interface ViewportProps {
    children: ReactNode,
}

const Viewport: FC<ViewportProps> = (props) => {
    const dispatch = useAppDispatch();
    const wrapper = useRef<HTMLDivElement>(null)
    const [width, setWidth] = useState<number>(0)
    const [height, setHeight] = useState<number>(0)


    useEffect(() => {
        window.onresize = () => {
            if (wrapper.current) {
                setWidth(Number(wrapper.current.clientWidth));
                setHeight(Number(wrapper.current.clientHeight));
            }
        }
        if (wrapper.current) {
            setWidth(Number(wrapper.current.clientWidth));
            setHeight(Number(wrapper.current.clientHeight));
        }
        return () => {
            window.onresize = null
        }
    }, []);

    useEffect(() => {
        dispatch(calculateBounds({width, height}))
    }, [width, height]);

    return (
        <div ref={wrapper} className={cls.viewport}>
            {props.children}
        </div>
    );
};

export default Viewport;