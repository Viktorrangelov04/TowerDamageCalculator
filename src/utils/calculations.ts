import type { CCBuild, CFBuild, SCCBuild, SCMBuild, UWBuild } from "@/types";
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

export const calculateTotalUWDamage = (inputs: UWBuild): number => {
    const substatValue = CL_SUBS[inputs.substatValue];
    let superTowerBonus = 0.35 * 5 * inputs.STLabValue;
    let vaultValue = 1+(UW_VAULT[inputs.vaultValue]/100);
    let relic = 1 + inputs.relicValue / 100;

    if(!inputs.hasMastery){
        superTowerBonus=1;
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
