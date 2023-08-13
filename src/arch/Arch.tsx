'use client'
import {FC, useEffect, useRef} from "react";
import {useAppDispatch} from "@/redux/hooks";
import {Grid} from "@/arch/Grid/Grid";
import Viewport from "@/arch/Viewport/Viewport";
import Canvas from "@/arch/Canvas/Canvas";

interface ArchProps {
    id: string;
}

export const Arch: FC<ArchProps> = (props) => {
    const dispatch = useAppDispatch();
    useEffect(() => {

    }, []);


    return <Viewport width={400} height={300}>
        <Canvas>
            <Grid />
        </Canvas>
    </Viewport>
}