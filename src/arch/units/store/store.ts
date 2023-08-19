import {ValueProps} from "@/arch/units/unitsSlice";

interface ValuesStore {
    levelName: 'values',
    values: Array<ValueProps>
}

interface MechsStore {
    levelName: 'mechs'
    values: ValuesStore
}

export interface UnitsStore {
    levelName: 'units'
    mechs: MechsStore
}

const store: UnitsStore = {
    levelName: "units",
    mechs: {
        levelName: "mechs",
        values: {
            levelName: "values",
            values: []
        }
    }
}