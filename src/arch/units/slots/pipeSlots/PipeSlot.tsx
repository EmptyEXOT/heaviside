import React, {FC} from 'react';
import {Slot as ISlot} from "@/arch/units/slots/types/Slot";
import {Cords} from "@/arch/types/Cords";
import {toPx} from "@/arch/Grid/gridSlice";

interface PipeSlotProps extends ISlot {
    position: Cords,
    isNecessary: boolean,
}

const PipeSlot: FC<PipeSlotProps> = (props) => {
    const {
        isBusy,
        id,
        unit,
        position,
        isNecessary,
    } = props

    return (
        <div style={{
            width: '10px',
            height: '10px',
            backgroundColor: isNecessary ? 'red' : 'grey',
            position: "absolute",
            top: toPx(position.y, 50, true),
            right: toPx(position.x, 50, true),
            transform: 'translate(50%, -50%)',
            zIndex: 1000,
        }}>
        </div>
    );
};

export default PipeSlot;