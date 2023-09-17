import {Size} from "@/arch/types/Size";
import {Unit} from "@/arch/units/unitsSlice";
import {ValuesState} from "@/arch/units/mechs/Values/valuesSlice";
import {SmeltersState} from "@/arch/units/mechs/Smelter/smeltersSlice";
import {PipeSlot} from "@/arch/units/slots/pipeSlots/types/PipeSlot";

export interface MechProps {
    size: Size;
    select: Unit;
    setCords: any;
    img: string;
    slots?: Array<PipeSlot>
}

export type MechStateType = ValuesState | SmeltersState;