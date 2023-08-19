import React, {FC} from 'react';
import {useAppSelector} from "@/redux/hooks";
import Value from "@/arch/units/mechs/Values/Value";

interface ValuesProps {
}

const Values: FC<ValuesProps> = (props) => {
    const values = useAppSelector(state => state.mechs.values.list)

    return (
        <>
            {values.map((value, index) => <Value key={index} id={index}/>)}
        </>
    );
};
export default Values;