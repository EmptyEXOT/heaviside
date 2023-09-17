import React, {FC} from 'react';
import {useAppSelector} from "@/redux/hooks";
import Mech from "@/arch/units/mechs/Mech";
import {setValueCords} from "@/arch/units/mechs/Values/valuesSlice";

interface ValueProps {
    id: number;
}

const Value: FC<ValueProps> = (props) => {
    const select = useAppSelector(state => state.mechs.values.list)[props.id]

    return (
        <Mech img={'blue'} size={{width: 2, height: 3}} select={select} key={select.id} setCords={setValueCords}/>
    )
};

export default Value;