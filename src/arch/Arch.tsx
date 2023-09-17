'use client'
import {FC} from "react";
import {Grid} from "@/arch/Grid/Grid";
import Viewport from "@/arch/Viewport/Viewport";
import Canvas from "@/arch/Canvas/Canvas";
import Units from "@/arch/units/Units";
import Pipeline from "@/arch/units/pipes/Pipeline";

interface ArchProps {

}

export const Arch: FC<ArchProps> = (props) => {
    return <Viewport>
        <Canvas>
            <Grid />
            <Units />
            <Pipeline />
        </Canvas>
    </Viewport>
}