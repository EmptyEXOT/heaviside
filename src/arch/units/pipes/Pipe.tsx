import React, {FC} from 'react';
import {toPx} from "@/arch/Grid/gridSlice";
import {getImageBlurSvg} from "next/dist/shared/lib/image-blur-svg";

interface PipeProps {
    x1: number,
    x2: number,
    y1: number,
    y2: number,
}

const Pipe: FC<PipeProps> = (props) => {


    return (
        <svg  style={{width: '100%', height: '100%', top: 0, left: 0, position: 'absolute', zIndex: -1}}>

            <line x1={toPx(props.x1, 50)} x2={toPx(props.x2, 50)} y1={toPx(props.y1, 50)} y2={toPx(props.y2, 50)}
                  style={{strokeOpacity: 1, stroke: "#00540A", strokeWidth: "10px"}}>

            </line>
        </svg>
    );
};

export default Pipe;