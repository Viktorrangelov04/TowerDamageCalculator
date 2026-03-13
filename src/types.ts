export interface CCBuild {
    cardValue: number;
    substatValue: number;
    assistSubstatValue: number;
    relicValue: number;
    vaultValue: number;
}

export interface CFBuild {
    labValue: number;
    substatValue: number;
    assistSubstatValue: number;
    workshopEnhancementValue: number;
    relicValue: number;
    vaultValue: number;
}

export interface SCCBuild {
    labValue: number;
    substatValue: number;
    assistSubstatValue: number;
    relicValue: number;
    vaultValue: number;
}

export interface SCMBuild {
    labValue: number;
    substatValue: number;
    assistSubstatValue: number;
    workshopEnhancementValue: number;
    relicValue: number;
    vaultValue: number;
}

export interface UWBuild {
    CLLvl: number;
    substatValue: number;
    assistSubstatValue: number;
    hasPerk: boolean;

    hasMastery: boolean;
    STLabValue: number;

    coreLvlMain: number;
    coreRarityMain: number;
    coreLvlAssist: number;
    coreRarityAssist: number;

    mainstatEfficiency: number;

    relicValue: number;
    vaultValue: number;
}

export interface DMGBuild {
    labValue: number;
    workshopEnhancementValue: number;
    dmgCardValue: number;
    hasMastery: boolean;
    masteryValue: number;
    hasDMMastery: boolean;
    DMMasteryValue: number;
    hasBerserker: boolean;
    hasBerserkerMastery: boolean;
    relicValue: number;

    cannonLvlMain: number;
    cannonRarityMain: number;
    cannonLvlAssist: number;
    cannonRarityAssist: number;

    mainstatEfficiency: number;

    hasAS: boolean;
    PFValue: number;
    endingCash: number;
    endingCashSuffix: string;
    ACPValue: number;
    DCValue: number;
    shockLabValue: number;

    vaultValue: number;
    SLValue: number;
    hasSLPerk: boolean;
    hasSLPlus: boolean;
    SLPlusValue: number;
    SLSubstatValue: number;
    SLAssistSubstatValue: number;

    UWCritValue: number;
    hasUWCritMastery: boolean;
    UWCritMasteryValue: number;

    damageMeterLab: number;
    damageMeterEnhancement: number;
    substatValue: number;
    assistSubstatValue: number;
    damageMeterRelics: number;
    damageMeterVault: number;
    hasRangeMastery: boolean;
    RangeMasteryValue: number;
    range: number;
    hasScout: boolean;
    scoutValue: number;

    hasAmpBot: boolean;
    ampBotValue: number;
}

export interface PlayerBuild {
    version: number;
    hasMastery: boolean;
    masteryValue: number;
    hasAssist: boolean;
    assistSubstatEfficiency: number;
    coreSubstatEfficiency: number;

    hasSL: boolean;
    cc: CCBuild;
    scc: SCCBuild;
    cf: CFBuild;
    scm: SCMBuild;
    uw: UWBuild;
    dmg: DMGBuild;
}
