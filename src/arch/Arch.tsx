'use client'
import {FC} from "react";
import {Grid} from "@/arch/Grid/Grid";
import Viewport from "@/arch/Viewport/Viewport";
import Canvas from "@/arch/Canvas/Canvas";

interface ArchProps {

}

export const Arch: FC<ArchProps> = (props) => {
    return <Viewport>
        <Canvas>
            <Grid />
        </Canvas>
    </Viewport>
}