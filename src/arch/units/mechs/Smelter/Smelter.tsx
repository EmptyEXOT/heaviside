import React, {FC, useCallback, useEffect} from 'react';
import {useAppDispatch, useAppSelector} from "@/redux/hooks";
import Mech from "@/arch/units/mechs/Mech";
import {setSmelterCords} from "@/arch/units/mechs/Smelter/smeltersSlice";

interface SmelterProps {
    id: number
}

const Smelter: FC<SmelterProps> = (props) => {
    const select = useAppSelector(state => state.mechs.smelters.list)[props.id]
    const slots = useAppSelector(state => state.mechs.smelters.list)[props.id].slots

    useEffect(() => {
        console.log(slots)
    }, []);

    return (
        <Mech slots={slots?.pipe} img={'green'} size={{width: 2, height: 3}} select={select} setCords={setSmelterCords}/>
    )
};

export default Smelter;