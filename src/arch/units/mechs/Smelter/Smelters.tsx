import React, {FC} from "react";
import {useAppSelector} from "@/redux/hooks";
import Smelter from "@/arch/units/mechs/Smelter/Smelter";

interface SmeltersProps {
}

const Smelters: FC<SmeltersProps> = (props) => {
    const smelters = useAppSelector(state => state.mechs.smelters.list)

    return (
        <>
            {smelters.map((smelter, index) => <Smelter key={index} id={index}/>)}
        </>
    );
};
export default Smelters;