export interface CCBuild {
    cardValue: number;
    substatValue: number;
    assistSubstatValue: number;
    relicValue: number;
    vaultValue: number;
}

export interface CFBuild {
    labValue: number,
    substatValue: number,
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
    baseUWDamage: number;
    substatValue: number;
    moduleMain: number;
    moduleAssist: number;
    hasMastery: boolean;
    STLabValue: number;
    hasSL: boolean;
    relicValue: number;
    vaultValue: number;
}

export interface DMGBuild{
    labValue: number;
    workshopEnhancementValue: number;
    dmgCardValue: number;
    hasMastery: boolean;
    masteryValue: number;
    hasBerserker: boolean;
    relicValue: number;
    hasAS: boolean;
    PFValue: number;
    endingCash: number;
    endingCashSuffix: string;
    ACPValue: number;
    amplifyBotValue: number;
}

export interface PlayerBuild {
    version: number;
    hasMastery: boolean;
    masteryValue: number;
    hasAssist: boolean;
    assistSubstatEfficiency: number;

    cc: CCBuild;
    scc: SCCBuild;
    cf: CFBuild; 
    scm: SCMBuild; 
    uw: UWBuild;
    dmg: DMGBuild;
}