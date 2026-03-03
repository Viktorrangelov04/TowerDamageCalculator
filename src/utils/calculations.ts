import type {
    CCBuild,
    CFBuild,
    DMGBuild,
    SCCBuild,
    SCMBuild,
    UWBuild,
} from "@/types";
import {
    CRIT_CARD_STATS,
    CRIT_MASTERY_STATS,
    CRIT_CHANCE_SUBS,
    CRIT_VAULT,
    SUPER_CRIT_SUBS,
    SUPER_CRIT_VAULT,
    CRIT_FACTOR_SUBS,
    CRIT_FACTOR_VAULT,
    SUPER_CRIT_MULTI_SUBS,
    SUPER_CRIT_MULTI_VAULT,
    CL_SUBS,
    UW_VAULT,
    DEMON_MODE_MASTERY_STATS,
    DAMAGE_MASTERY_STATS,
    PF_STATS,
    ACP_STATS,
    DAMAGE_CARD_STATS,
    DMG_VAULT,
    RANGE_MASTERY_STATS,
    DPM_SUBS,
    DPM_VAULT,
    DC_STATS,
} from "@/data/constants";

export interface CritInputs extends CCBuild {
    hasMastery: boolean;
    masteryValue: number;
    hasAssist: boolean;
    efficiency: number;
}

export const calculateTotalCrit = (inputs: CritInputs): number => {
    const cardValue = CRIT_CARD_STATS[inputs.cardValue] || 0;
    const masteryValue = CRIT_MASTERY_STATS[inputs.masteryValue] || 0;
    const substatValue = CRIT_CHANCE_SUBS[inputs.substatValue] || 0;
    const assistValue = CRIT_CHANCE_SUBS[inputs.assistSubstatValue] || 0;
    const vaultValue = CRIT_VAULT[inputs.vaultValue] || 0;

    const effectiveMastery = inputs.hasMastery ? masteryValue : 0;
    const effectiveAssist = inputs.hasAssist
        ? assistValue * (inputs.efficiency / 100)
        : 0;

    return (
        80 +
        cardValue +
        effectiveMastery +
        substatValue +
        effectiveAssist +
        inputs.relicValue +
        vaultValue
    );
};

export interface SCCInputs extends SCCBuild {
    hasMastery: boolean;
    masteryValue: number;
    hasAssist: boolean;
    efficiency: number;
}

export const calculateTotalSuperCrit = (inputs: SCCInputs): number => {
    const masteryValue = CRIT_MASTERY_STATS[inputs.masteryValue] || 0;
    const substatValue = SUPER_CRIT_SUBS[inputs.substatValue] || 0;
    const assistValue = SUPER_CRIT_SUBS[inputs.assistSubstatValue] || 0;
    const vaultValue = SUPER_CRIT_VAULT[inputs.vaultValue] || 0;

    const effectiveMastery = inputs.hasMastery ? masteryValue : 0;
    const effectiveAssist = inputs.hasAssist
        ? assistValue * (inputs.efficiency / 100)
        : 0;

    return (
        20 +
        effectiveMastery +
        substatValue +
        effectiveAssist +
        inputs.relicValue +
        inputs.labValue +
        vaultValue
    );
};

export interface CritFactorInputs extends CFBuild {
    hasAssist: boolean;
    efficiency: number;
}

export const calculateTotalCritFactor = (inputs: CritFactorInputs): number => {
    const substatValue = CRIT_FACTOR_SUBS[inputs.substatValue] || 0;
    const assistValue = CRIT_FACTOR_SUBS[inputs.assistSubstatValue] || 0;
    const vaultValue = CRIT_FACTOR_VAULT[inputs.vaultValue] || 0;

    const effectiveAssist = inputs.hasAssist
        ? assistValue * (inputs.efficiency / 100)
        : 0;

    const total =
        (16.2 * inputs.labValue + substatValue + effectiveAssist) *
        (1 + inputs.relicValue / 100) *
        (1 + vaultValue / 100) *
        inputs.workshopEnhancementValue;

    return total;
};

export interface SuperCritMultiInputs extends SCMBuild {
    hasMastery: boolean;
    masteryValue: number;
    hasAssist: boolean;
    efficiency: number;
}

export const calculateTotalSuperCritMulti = (
    inputs: SuperCritMultiInputs
): number => {
    const masteryValue = CRIT_MASTERY_STATS[inputs.masteryValue] || 0;
    const substatValue = SUPER_CRIT_MULTI_SUBS[inputs.substatValue] || 0;
    const assistValue = SUPER_CRIT_MULTI_SUBS[inputs.assistSubstatValue] || 0;
    const vaultValue = SUPER_CRIT_MULTI_VAULT[inputs.vaultValue] || 0;

    const effectiveMastery = inputs.hasMastery ? masteryValue : 0;
    const effectiveAssist = inputs.hasAssist
        ? assistValue * (inputs.efficiency / 100)
        : 0;

    const total =
        (13.2 * inputs.labValue + substatValue + effectiveAssist) *
        (1 + inputs.relicValue / 100) *
        (1 + vaultValue / 100) *
        (1 + effectiveMastery / 100) *
        inputs.workshopEnhancementValue;

    return total;
};

export interface UWDamageInputs extends UWBuild {
    hasSL: boolean;
}

export const calculateTotalUWDamage = (inputs: UWDamageInputs): number => {
    const substatValue = CL_SUBS[inputs.substatValue];
    let superTowerBonus = 0.35 * 5 * inputs.STLabValue;
    let vaultValue = 1 + UW_VAULT[inputs.vaultValue] / 100;
    let relic = 1 + inputs.relicValue / 100;

    if (!inputs.hasMastery) {
        superTowerBonus = 1;
    }

    if (inputs.hasSL) {
        superTowerBonus = superTowerBonus * superTowerBonus;
        vaultValue = vaultValue * vaultValue;
        relic = relic * relic;
    }

    const total =
        (inputs.baseUWDamage + substatValue) *
        inputs.moduleMain *
        inputs.moduleAssist *
        relic *
        vaultValue *
        superTowerBonus;
    return total;
};

export const calculateBaseDamage = (inputs: DMGBuild): number => {
    const cardValue = DAMAGE_CARD_STATS[inputs.dmgCardValue];
    const relicValue = 1 + inputs.relicValue / 100;
    const vaultValue = 1 + DMG_VAULT[inputs.vaultValue] / 100;

    const masteryValue = inputs.hasMastery
        ? DAMAGE_MASTERY_STATS[inputs.masteryValue]
        : 1;
    const DMMasteryValue = inputs.hasDMMastery
        ? DEMON_MODE_MASTERY_STATS[inputs.DMMasteryValue]
        : 1;

    let cashValue = inputs.endingCash;

    if (inputs.endingCashSuffix == "M") {
        cashValue = inputs.endingCash * 1000000;
    } else if (inputs.endingCashSuffix == "B") {
        cashValue = inputs.endingCash * 1000000000;
    } else if (inputs.endingCashSuffix == "T") {
        cashValue = inputs.endingCash * 1000000000000;
    }
    const PFValue = 1 + Math.log10(cashValue) * PF_STATS[inputs.PFValue];

    const effectiveZerk = inputs.hasBerserker ? 8 : 1;
    const effectiveAS = inputs.hasAS ? 5 : 1;

    const total =
        71100000 *
        inputs.workshopEnhancementValue *
        inputs.labValue *
        inputs.moduleMain *
        cardValue *
        relicValue *
        vaultValue *
        masteryValue *
        DMMasteryValue *
        PFValue *
        effectiveZerk *
        effectiveAS;

    return total;
};

export interface damageMeterInputs extends DMGBuild {
    hasAssist: boolean;
    assistSubstatEfficiency: number;
}

export const calculateTotalDamageMeter = (
    inputs: damageMeterInputs
): number => {
    const effectiveAssist = inputs.hasAssist
        ? DPM_SUBS[inputs.assistSubstatValue] *
          (inputs.assistSubstatEfficiency / 100)
        : 0;
    const effectiveMastery = inputs.hasRangeMastery
        ? RANGE_MASTERY_STATS[inputs.RangeMasteryValue]
        : 1;
    const effectiveVault = 1 + DPM_VAULT[inputs.damageMeterVault] / 100;
    const effectiveRelic = 1 + inputs.damageMeterRelics / 100;
    const effectiveSub = DPM_SUBS[inputs.substatValue];

    const total =
        1 +
        (0.059 * inputs.damageMeterLab + effectiveSub + effectiveAssist) *
            inputs.damageMeterEnhancement *
            effectiveRelic *
            effectiveVault *
            effectiveMastery;
    return total;
};

export interface damageMultiInputs extends DMGBuild {
    hasSL: boolean;
    hasAssist: boolean;
    assistSubstatEfficiency: number;
}

export const calculateTotalDamageMulti = (inputs:damageMultiInputs):number =>{
    const ACPValue = ACP_STATS[inputs.ACPValue]
    const effectiveSL = inputs.hasSL ? inputs.SLValue : 1;
    const effectiveAmp = inputs.hasAmpBot ? inputs.ampBotValue : 1;
    const shockProccs = DC_STATS[inputs.DCValue]

    let shockValue = 1;
    if(inputs.DCValue == 0){
        shockValue = 1+1*inputs.shockLabValue
    }else{
        shockValue = 1+shockProccs*inputs.shockLabValue*2
    }

    const effectiveAssist = inputs.hasAssist
        ? DPM_SUBS[inputs.assistSubstatValue] *
          (inputs.assistSubstatEfficiency / 100)
        : 0;
    const effectiveMastery = inputs.hasRangeMastery
        ? RANGE_MASTERY_STATS[inputs.RangeMasteryValue]
        : 1;
    const effectiveVault = 1 + DPM_VAULT[inputs.damageMeterVault] / 100;
    const effectiveRelic = 1 + inputs.damageMeterRelics / 100;
    const effectiveSub = DPM_SUBS[inputs.substatValue];

    const DPM =
        1 +
        (0.059 * inputs.damageMeterLab + effectiveSub + effectiveAssist) *
            inputs.damageMeterEnhancement *
            effectiveRelic *
            effectiveVault *
            effectiveMastery;

    const effectiveSLPlus = inputs.hasSLPlus
        ? 1 + (DPM - 1) * inputs.range * inputs.SLPlusValue
        : 1;


    const total = 1* ACPValue *effectiveSL *effectiveSLPlus * effectiveAmp * shockValue;
    return total;
}


// export interface DamageInputs extends DMGBuild {
//     hasSL: boolean;
//     hasAssist: boolean;
//     assistSubstatEfficiency: number;
// }

// export const calculateTotalDamage = (inputs: DamageInputs): number => {
//     const relicValue = 1 + inputs.relicValue / 100;
//     const vaultValue = 1 + DMG_VAULT[inputs.vaultValue] / 100;

//     const masteryValue = inputs.hasMastery
//         ? DAMAGE_MASTERY_STATS[inputs.masteryValue]
//         : 1;
//     const DMMasteryValue = inputs.hasDMMastery
//         ? DEMON_MODE_MASTERY_STATS[inputs.DMMasteryValue]
//         : 1;

//     let cashValue = inputs.endingCash;

//     if (inputs.endingCashSuffix == "M") {
//         cashValue = inputs.endingCash * 1000000;
//     } else if (inputs.endingCashSuffix == "B") {
//         cashValue = inputs.endingCash * 1000000000;
//     } else if (inputs.endingCashSuffix == "T") {
//         cashValue = inputs.endingCash * 1000000000000;
//     }
//     const PFValue = 1 + Math.log10(cashValue) * PF_STATS[inputs.PFValue];

//     const effectiveSL = inputs.hasSL ? inputs.SLValue : 1;
//     const effectiveZerk = inputs.hasBerserker ? 8 : 1;
//     const effectiveAS = inputs.hasAS ? 5 : 1;

//     const effectiveAssist = inputs.hasAssist
//         ? DPM_SUBS[inputs.assistSubstatValue] *
//           (inputs.assistSubstatEfficiency / 100)
//         : 0;
//     const effectiveMastery = inputs.hasRangeMastery
//         ? RANGE_MASTERY_STATS[inputs.RangeMasteryValue]
//         : 1;
//     const effectiveVault = 1 + DPM_VAULT[inputs.damageMeterVault] / 100;
//     const effectiveRelic = 1 + inputs.damageMeterRelics / 100;
//     const effectiveSub = DPM_SUBS[inputs.substatValue];

//     const DPM =
//         1 +
//         (0.059 * inputs.damageMeterLab + effectiveSub + effectiveAssist) *
//             inputs.damageMeterEnhancement *
//             effectiveRelic *
//             effectiveVault *
//             effectiveMastery;

//     const effectiveSLPlus = inputs.hasSLPlus
//         ? 1 + (DPM - 1) * inputs.range * inputs.SLPlusValue
//         : 1;

//     let total =
//         71111000 *
//         inputs.workshopEnhancementValue *
//         inputs.labValue *
//         DAMAGE_CARD_STATS[inputs.dmgCardValue] *
//         masteryValue *
//         DMMasteryValue *
//         ACP_STATS[inputs.ACPValue] *
//         PFValue *
//         relicValue *
//         vaultValue *
//         inputs.moduleMain *
//         inputs.moduleAssist *
//         effectiveSL *
//         effectiveZerk *
//         effectiveAS *
//         effectiveSLPlus;

//     return total;
// };
