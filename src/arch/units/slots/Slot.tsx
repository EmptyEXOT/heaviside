import React, {FC} from 'react';
import {Slot as ISlot} from "@/arch/units/slots/types/Slot";
import {Cords} from "@/arch/types/Cords";

interface SlotProps extends ISlot {
}

const Slot: FC<SlotProps> = (props) => {

    return (
        <div style={{
            width: '10px',
            height: '10px',
            backgroundColor: 'black',
            position: "absolute",
            top: 0,
            right: 0,
            zIndex: 1000
        }}>
            {props.id}
        </div>
    );
};

export default Slot;