import React, {FC} from 'react';
import Values from "@/arch/units/mechs/Values/Values";
import Smelters from "@/arch/units/mechs/Smelter/Smelters";

interface MechsProps {

}

const Mechs: FC<MechsProps> = (props) => {
    return (
        <>
            <Values />
            <Smelters />
        </>
    );
};

export default Mechs;