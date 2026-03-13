import { useEffect, useState } from "react";
import Header from "./components/header.tsx";
import OverviewCard from "./components/OverviewCard.tsx";
import DamageMenu from "./components/DamageMenu.tsx";
import CritMenu from "./components/CritMenu.tsx";
import UWMenu from "./components/UWMenu.tsx";
import {
    calculateBaseDamage,
    calculateTotalCrit,
    calculateTotalCritFactor,
    calculateTotalDamageMulti,
    calculateTotalSuperCrit,
    calculateTotalSuperCritMulti,
    calculateTotalUWDamage,
} from "./utils/calculations.ts";
import type { PlayerBuild } from "./types.ts";
import { formatCompactNumber } from "./utils/numberFormatter.ts";
import { Button } from "./components/ui/button.tsx";
import TotalDamageCard from "./components/TotalDamageCard.tsx";
import DisclaimerBanner from "./components/DisclaimerBanner.tsx";

const CURRENT_VERSION = 1.2;

const DEFAULT_BUILD = {
    version: CURRENT_VERSION,
    hasMastery: false,
    masteryValue: 0,
    hasAssist: false,
    assistSubstatEfficiency: 0,
    coreSubstatEfficiency: 0,
    hasSL: false,
    cc: {
        cardValue: 0,
        substatValue: 0,
        assistSubstatValue: 0,
        relicValue: 0,
        vaultValue: 0,
    },
    cf: {
        labValue: 1,
        workshopEnhancementValue: 1,
        substatValue: 0,
        assistSubstatValue: 0,
        relicValue: 0,
        vaultValue: 0,
    },
    scc: {
        labValue: 0,
        substatValue: 0,
        assistSubstatValue: 0,
        relicValue: 0,
        vaultValue: 0,
    },
    scm: {
        labValue: 1,
        workshopEnhancementValue: 1,
        substatValue: 0,
        assistSubstatValue: 0,
        relicValue: 0,
        vaultValue: 0,
    },
    uw: {
        CLLvl: 0,
        substatValue: 0,
        assistSubstatValue: 0,
        hasPerk: false,

        hasMastery: false,
        STLabValue: 1,

        coreLvlMain: 0,
        coreLvlAssist: 0,
        coreRarityMain: 0,
        coreRarityAssist: 0,
        mainstatEfficiency: 0,

        relicValue: 0,
        vaultValue: 0,
    },
    dmg: {
        labValue: 1,
        workshopEnhancementValue: 1,

        dmgCardValue: 0,
        hasBerserker: false,
        hasBerserkerMastery: false,
        hasMastery: false,
        masteryValue: 0,
        hasDMMastery: false,
        DMMasteryValue: 0,
        hasAS: false,

        moduleMain: 1,
        moduleAssist: 1,

        cannonLvlMain: 0,
        cannonRarityMain: 0,
        cannonLvlAssist: 0,
        cannonRarityAssist: 0,

        mainstatEfficiency: 0,

        PFValue: 0,
        endingCash: 1,
        endingCashSuffix: "M",
        ACPValue: 0,
        DCValue: 0,
        shockLabValue: 0.1,
        amplifyBotValue: 0,

        relicValue: 0,
        vaultValue: 0,

        SLValue: 8,
        hasSLPerk: false,
        hasSLPlus: false,
        SLPlusValue: 0.01,
        SLSubstatValue: 0,
        SLAssistSubstatValue: 0,

        damageMeterEnhancement: 1,
        damageMeterLab: 1,
        substatValue: 0,
        assistSubstatValue: 0,
        damageMeterRelics: 0,
        damageMeterVault: 0,
        hasRangeMastery: false,
        RangeMasteryValue: 0,
        range: 69.5,
        hasScout: false,
        scoutValue: 2,

        hasAmpBot: false,
        ampBotValue: 1,
    },
};

function App() {
    const [activeTab, setActiveTab] = useState<string | null>(null);
    const setHasSL = (val: boolean) =>
        setBuild((p: any) => ({ ...p, hasSL: val }));

    const setHasAssist = (val: boolean) =>
        setBuild((p: any) => ({ ...p, hasAssist: val }));

    const setAssistSubstatEfficiency = (val: number) =>
        setBuild((p: any) => ({ ...p, assistSubstatEfficiency: val }));

    const setCoreSubstatEfficiency = (val: number) =>
        setBuild((p: any) => ({ ...p, coreSubstatEfficiency: val }));

    const [build, setBuild] = useState<PlayerBuild>(() => {
        const saved = localStorage.getItem("player_build");

        if (saved) {
            try {
                const parsed = JSON.parse(saved);

                if (parsed.version === CURRENT_VERSION) {
                    return parsed;
                }

                console.warn("Old version detected, resetting to default.");
            } catch (e) {
                console.error("Error parsing storage", e);
            }
        }

        return { ...DEFAULT_BUILD, version: CURRENT_VERSION };
    });

    const [comparisonBuild, setComparisonBuild] = useState<PlayerBuild | null>(
        () => {
            const saved = localStorage.getItem("player_build_comparison");
            if (saved) {
                try {
                    const parsed = JSON.parse(saved);
                    if (parsed.version === CURRENT_VERSION) return parsed;
                } catch (e) {
                    console.error(e);
                }
            }
            return null;
        }
    );

    useEffect(() => {
        localStorage.setItem("player_build", JSON.stringify(build));
    }, [build]);

    useEffect(() => {
        if (comparisonBuild) {
            localStorage.setItem(
                "player_build_comparison",
                JSON.stringify(comparisonBuild)
            );
        }
    }, [comparisonBuild]);

    const handleSaveComparison = () => {
        setComparisonBuild({ ...build });
    };

    const handleClearComparison = () => {
        setComparisonBuild(null);
        localStorage.removeItem("player_build_comparison");
    };
    /////////////////////////////////////////////////////////////
    const totalCC = calculateTotalCrit({
        ...build.cc,
        hasMastery: build.hasMastery,
        masteryValue: build.masteryValue,
        hasAssist: build.hasAssist,
        efficiency: build.assistSubstatEfficiency,
    });

    const totalCF = calculateTotalCritFactor({
        ...build.cf,
        hasAssist: build.hasAssist,
        efficiency: build.assistSubstatEfficiency,
    });

    const totalSCC = calculateTotalSuperCrit({
        ...build.scc,
        hasMastery: build.hasMastery,
        masteryValue: build.masteryValue,
        hasAssist: build.hasAssist,
        efficiency: build.assistSubstatEfficiency,
    });

    const totalSCM = calculateTotalSuperCritMulti({
        ...build.scm,
        hasMastery: build.hasMastery,
        masteryValue: build.masteryValue,
        hasAssist: build.hasAssist,
        efficiency: build.assistSubstatEfficiency,
    });

    const totalUWDamage = calculateTotalUWDamage({
        ...build.uw,
        coreSubstatEfficiency: build.coreSubstatEfficiency,
    });

    const baseDamage = calculateBaseDamage({
        ...build.dmg,
    });

    const damageMulti = calculateTotalDamageMulti({
        ...build.dmg,
        hasAssist: build.hasAssist,
        hasSL: build.hasSL,
        assistSubstatEfficiency: build.assistSubstatEfficiency,
        totalCF: totalCF,
        coreSubstatEfficiency: build.coreSubstatEfficiency,
        UWRelicValue: build.uw.relicValue,
        hasST: build.uw.hasMastery,
        STLabValue: build.uw.STLabValue,
        UWVaultValue: build.uw.vaultValue,
    });

    const totalDamage = baseDamage * damageMulti;

    const critMulti =
        (1 + (totalCC / 100) * totalCF) *
        (1 + (totalCC / 100) * (totalSCC / 100) * totalSCM);

    const finalDamage = critMulti * totalUWDamage * totalDamage;

   

    //////////////////////////////////////////////////////////////

    const totalCC2 = comparisonBuild
        ? calculateTotalCrit({
              ...comparisonBuild.cc,
              hasMastery: comparisonBuild.hasMastery,
              masteryValue: comparisonBuild.masteryValue,
              hasAssist: comparisonBuild.hasAssist,
              efficiency: comparisonBuild.assistSubstatEfficiency,
          })
        : null;

    const totalCF2 = comparisonBuild
        ? calculateTotalCritFactor({
              ...comparisonBuild.cf,
              hasAssist: comparisonBuild.hasAssist,
              efficiency: comparisonBuild.assistSubstatEfficiency,
          })
        : null;

    const totalSCC2 = comparisonBuild
        ? calculateTotalSuperCrit({
              ...comparisonBuild.scc,
              hasMastery: comparisonBuild.hasMastery,
              masteryValue: comparisonBuild.masteryValue,
              hasAssist: comparisonBuild.hasAssist,
              efficiency: comparisonBuild.assistSubstatEfficiency,
          })
        : null;

    const totalSCM2 = comparisonBuild
        ? calculateTotalSuperCritMulti({
              ...comparisonBuild.scm,
              hasMastery: comparisonBuild.hasMastery,
              masteryValue: comparisonBuild.masteryValue,
              hasAssist: comparisonBuild.hasAssist,
              efficiency: comparisonBuild.assistSubstatEfficiency,
          })
        : null;

    const totalUWDamage2 = comparisonBuild
        ? calculateTotalUWDamage({
              ...comparisonBuild.uw,
              coreSubstatEfficiency: comparisonBuild.coreSubstatEfficiency,
          })
        : null;

    const baseDamage2 = comparisonBuild
        ? calculateBaseDamage({
              ...comparisonBuild.dmg,
          })
        : null;

    const damageMulti2 = comparisonBuild
        ? calculateTotalDamageMulti({
              ...comparisonBuild.dmg,
              hasAssist: comparisonBuild.hasAssist,
              hasSL: comparisonBuild.hasSL,
              assistSubstatEfficiency: comparisonBuild.assistSubstatEfficiency,
              totalCF: totalCF2,
              coreSubstatEfficiency: comparisonBuild.coreSubstatEfficiency,
              UWRelicValue: comparisonBuild.uw.relicValue,
              hasST: comparisonBuild.uw.hasMastery,
              STLabValue: comparisonBuild.uw.STLabValue,
              UWVaultValue: comparisonBuild.uw.vaultValue,
          })
        : null;

    const totalDamage2 =
        baseDamage2 && damageMulti2 ? baseDamage2 * damageMulti2 : null;

    const critMulti2 =
        totalCC2 && totalCF2 && totalSCC2 && totalSCM2
            ? (1 + (totalCC2 / 100) * totalCF2) *
              (1 + (totalCC2 / 100) * (totalSCC2 / 100) * totalSCM2)
            : null;

    const finalDamage2 =
        critMulti2 && totalUWDamage2 && totalDamage2
            ? critMulti2 * totalUWDamage2 * totalDamage2
            : null;

    return (
        <div className="max-w-6xl mx-auto p-8">
            <Header />
            <DisclaimerBanner />
            <div className="w-4/5 mx-auto my-8 grid grid-cols-1 md:grid-cols-4 gap-6">
                <OverviewCard
                    name="Damage"
                    value={formatCompactNumber(totalDamage)}
                    onClick={() => setActiveTab("damage")}
                    active={activeTab === "damage"}
                />
                <OverviewCard
                    name="Crit Bonus"
                    value={formatCompactNumber(critMulti, 0)}
                    onClick={() => setActiveTab("crit")}
                    active={activeTab === "crit"}
                    prefix="x"
                />

                <OverviewCard
                    name="UW damage"
                    value={formatCompactNumber(totalUWDamage)}
                    onClick={() => setActiveTab("uw")}
                    active={activeTab === "uw"}
                    prefix="x"
                />
                <TotalDamageCard
                    name="Final damage"
                    value={finalDamage}
                    value2={finalDamage2}
                />
            </div>
            <div className="controls flex justify-center">
                <Button className="mx-3" onClick={handleSaveComparison}>
                    {comparisonBuild
                        ? "Update Snapshot"
                        : "Save for Comparison"}
                </Button>
                {comparisonBuild && (
                    <Button className="mx-3" onClick={handleClearComparison}>
                        Clear Comparison
                    </Button>
                )}
            </div>

            <div className="rounded-xl border p-6 shadow-sm min-h-[300px] mt-8">
                {!activeTab && (
                    <p className="text-center text-muted-foreground pt-10">
                        Select a category above to input your data.
                    </p>
                )}

                {activeTab === "damage" && (
                    <DamageMenu
                        build={build}
                        totalCF={totalCF}
                        setBuild={setBuild}
                        setHasSL={setHasSL}
                        setHasAssist={setHasAssist}
                        setAssistSubstatEfficiency={setAssistSubstatEfficiency}
                        setCoreSubstatEfficiency={setCoreSubstatEfficiency}
                    />
                )}
                {activeTab === "crit" && (
                    <CritMenu build={build} setBuild={setBuild} />
                )}
                {activeTab === "uw" && (
                    <UWMenu
                        data={build.uw}
                        setBuild={setBuild}
                        hasSL={build.hasSL}
                        setHasSL={setHasSL}
                        coreSubstatEfficiency={build.coreSubstatEfficiency}
                        setCoreSubstatEfficiency={setCoreSubstatEfficiency}
                    />
                )}
            </div>
        </div>
    );
}

export default App;
