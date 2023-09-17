import {Unit} from "@/arch/units/unitsSlice";
import {PipeSlot} from "@/arch/units/slots/pipeSlots/types/PipeSlot";

export interface Slot {
    unit?: Unit,
    id: number,
    isBusy: boolean,
}

export type SlotType = PipeSlot