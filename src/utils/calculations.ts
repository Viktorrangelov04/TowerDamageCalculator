export interface CritInputs {
    cardValue: number;
    hasMastery: boolean;
    masteryValue: number;
    substatValue: number;
    hasAssist: boolean;
    efficiency: number;
    assistValue: number;
    relicsValue: number;
    vaultValue: number;
}

export interface SuperCritInputs{
    hasMastery: boolean;
    masteryValue: number;
    substatValue: number;
    hasAssist: boolean;
    efficiency: number;
    assistValue: number;
    relicValue: number;
    labValue: number;
    vaultValue: number;
}

export interface CritFactorInputs{
    substatValue: number;
    hasAssist: boolean;
    efficiency: number;
    assistValue: number;
    relicValue: number;
    workshopEnhancementValue: number;
    labValue: number;
    vaultValue: number;
}

export interface SuperCritMultiInputs{
    hasMastery: boolean;
    masteryValue: number;
    substatValue: number;
    hasAssist: boolean;
    efficiency: number;
    assistValue: number;
    relicValue: number;
    labValue: number;
    workshopEnhancementValue: number;
    vaultValue: number;
}

export const calculateTotalCrit = (inputs: CritInputs): number => {
    const {
        cardValue,
        hasMastery,
        masteryValue,
        substatValue,
        hasAssist,
        efficiency,
        assistValue,
        relicsValue,
        vaultValue
    } = inputs;

    const effectiveMastery = hasMastery ? masteryValue : 0;

    const effectiveAssist = hasAssist ? assistValue * (efficiency / 100) : 0;

    const total = 80+cardValue + effectiveMastery + substatValue + effectiveAssist+relicsValue+vaultValue;

    return total;
};

export const calculateTotalSuperCrit = (inputs: SuperCritInputs): number=>{
    const{
        hasMastery,
        masteryValue,
        substatValue,
        hasAssist,
        efficiency,
        assistValue,
        relicValue,
        vaultValue,
        labValue,
    } = inputs;

    const effectiveMastery = hasMastery?masteryValue:0;

    const effectiveAssist = hasAssist ? assistValue * (efficiency / 100) : 0;

    const total = 20+ effectiveMastery + substatValue + effectiveAssist + relicValue + labValue + vaultValue;

    return total;
}

export const calculateTotalCritFactor = (inputs: CritFactorInputs): number=>{
    const{
        substatValue,
        hasAssist,
        efficiency,
        assistValue,
        relicValue,
        vaultValue,
        labValue,
        workshopEnhancementValue,
    } = inputs;


    const effectiveAssist = hasAssist ? assistValue * (efficiency / 100) : 0;

    const total = (16.2*labValue+ substatValue+ effectiveAssist)*(1+relicValue/100)*(1+vaultValue/100)*workshopEnhancementValue;

    return total;
}

export const calculateTotalSuperCritMulti = (inputs:SuperCritMultiInputs): number =>{
    const{
        hasMastery,
        masteryValue,
        substatValue,
        hasAssist,
        efficiency,
        assistValue,
        relicValue,
        vaultValue,
        labValue,
        workshopEnhancementValue
    } = inputs;

    const effectiveMastery = hasMastery ? masteryValue : 0;

    const effectiveAssist = hasAssist ? assistValue * (efficiency / 100) : 0;

    const total = (13.2*labValue + substatValue + effectiveAssist)*(1+relicValue/100)*(1+vaultValue/100)*(1+effectiveMastery/100)*workshopEnhancementValue

    return total;
}
