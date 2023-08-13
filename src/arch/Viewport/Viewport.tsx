import React, {FC, ReactNode} from 'react';
import cls from './Viewport.module.css'
interface ViewportProps {
    width: number,
    height: number,
    children: ReactNode,
}

const Viewport: FC<ViewportProps> = (props) => {
    return (
        <div className={cls.viewport} style={{width: props.width, height: props.height}}>
            {props.children}
        </div>
    );
};

export default Viewport;