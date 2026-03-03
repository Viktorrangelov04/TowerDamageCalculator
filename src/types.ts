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
    
    relicValue: number;
    vaultValue: number;
}

export interface DMGBuild{
    labValue: number;
    workshopEnhancementValue: number;
    dmgCardValue: number;
    hasMastery: boolean;
    masteryValue: number;
    hasDMMastery: boolean;
    DMMasteryValue: number;
    hasBerserker: boolean;
    relicValue: number;

    moduleMain:number;
    moduleAssist:number;
    hasAS: boolean;
    PFValue: number;
    endingCash: number;
    endingCashSuffix: string;
    ACPValue: number;
    DCValue: number;
    shockLabValue: number;

    vaultValue: number;
    SLValue: number;
    hasSLPlus: boolean;
    SLPlusValue: number;

    damageMeterLab: number;
    damageMeterEnhancement: number;
    substatValue: number;
    assistSubstatValue: number;
    damageMeterRelics: number;
    damageMeterVault: number;
    hasRangeMastery: boolean;
    RangeMasteryValue: number;
    range: number;

    hasAmpBot: boolean;
    ampBotValue: number;
}

export interface PlayerBuild {
    version: number;
    hasMastery: boolean;
    masteryValue: number;
    hasAssist: boolean;
    assistSubstatEfficiency: number;

    hasSL: boolean;
    cc: CCBuild;
    scc: SCCBuild;
    cf: CFBuild; 
    scm: SCMBuild; 
    uw: UWBuild;
    dmg: DMGBuild;
}