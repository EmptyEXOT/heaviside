import {Slot} from "@/arch/units/slots/types/Slot";
import {Cords} from "@/arch/types/Cords";

enum PipeSlotDirection {
    From = 'from',
    To = 'to',
}

export interface PipeSlot extends Slot {
    direction?: PipeSlotDirection
    position?: Cords,
    isNecessary: boolean
}