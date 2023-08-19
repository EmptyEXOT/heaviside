'use client'
import {FC} from "react";
import {Grid} from "@/arch/Grid/Grid";
import Viewport from "@/arch/Viewport/Viewport";
import Canvas from "@/arch/Canvas/Canvas";
import Units from "@/arch/units/Units";

interface ArchProps {

}

export const Arch: FC<ArchProps> = (props) => {
    return <Viewport>
        <Canvas>
            <Grid />
            <Units />
        </Canvas>
    </Viewport>
}