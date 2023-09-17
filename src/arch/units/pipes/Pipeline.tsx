import React from 'react';
import {useAppSelector} from "@/redux/hooks";
import {selectPipelineById} from "@/arch/units/pipes/pipelinesSlice";
import Pipe from "@/arch/units/pipes/Pipe";


const Pipeline = () => {
    const pipeline = useAppSelector(selectPipelineById(0))

    const calcPipes = () => {
        let pipe: Array<{x1: number, x2: number, y1: number, y2: number}> = [];
        for (let i = 0; i < pipeline.breakpoints.length - 1; i++) {
            pipe.push({
                x1: pipeline.breakpoints[i].x,
                x2: pipeline.breakpoints[i+1].x,
                y1: pipeline.breakpoints[i].y,
                y2: pipeline.breakpoints[i+1].y
            })
        }
        console.log(pipe)
        return pipe;
    }

    return (
        <div>
            {calcPipes().map((pipe, index) => <Pipe key={index} x1={pipe.x1} x2={pipe.x2} y1={pipe.y1} y2={pipe.y2}></Pipe>)}
        </div>
    );
};

export default Pipeline;