import React, {FC, ReactNode} from 'react';


interface MechProps {
    children: ReactNode
}

const Mech: FC<MechProps> = (props) => {
    return (
        <div>
            {props.children}
        </div>
    );
};

export default Mech;