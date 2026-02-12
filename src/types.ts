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
}