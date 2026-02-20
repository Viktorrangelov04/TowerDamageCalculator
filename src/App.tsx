import { useEffect, useState } from "react";
import Header from "./components/header.tsx";
import OverviewCard from "./components/OverviewCard.tsx";
import DamageMenu from "./components/DamageMenu.tsx";
import CritMenu from "./components/CritMenu.tsx";
import UWMenu from "./components/UWMenu.tsx";
import {
    calculateTotalCrit,
    calculateTotalCritFactor,
    calculateTotalSuperCrit,
    calculateTotalSuperCritMulti,
    calculateTotalUWDamage,
} from "./utils/calculations.ts";
import type { PlayerBuild } from "./types.ts";

const CURRENT_VERSION = 1.0;

const DEFAULT_BUILD = {
    version: 1.0,
    hasMastery: false,
    masteryValue: 0,
    hasAssist: false,
    assistSubstatEfficiency: 0,
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
        baseUWDamage: 1,
        substatValue: 0,
        moduleMain: 1,
        moduleSub: 1,
        hasMastery: false,
        STLabValue: 1,
        hasSL: false,
        relicValue: 0,
        vaultValue: 0,
    },
    dmg:{
        labValue: 1,
        workshopEnhancementValue: 1,
        relicValue: 0,
        dmgCardValue: 0,
        hasBerserker: false,
        hasMastery: false,
        masteryValue: 0,
        hasAS: false,

        PFValue: 0,
        endingCash: 0,
        endingCashSuffix: "",
        ACPValue: 0,
        amplifyBotValue: 0,
        
    }
};

function App() {
    const [activeTab, setActiveTab] = useState<string | null>(null);

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

    useEffect(() => {
        localStorage.setItem("player_build", JSON.stringify(build));
    }, [build]);

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
        ...build.uw
    })

    const CritMulti =
        (1 + (totalCC / 100) * totalCF) *
        (1 + (totalSCC / 100) * (totalCC / 100) * totalSCM);

    return (
        <div className="max-w-6xl mx-auto p-8">
            <Header />
            <div className="w-4/5 mx-auto my-8 grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
                <OverviewCard
                    name="Damage"
                    value={"1"}
                    onClick={() => setActiveTab("damage")}
                    active={activeTab === "damage"}
                />
                <OverviewCard
                    name="Crit Bonus"
                    value={CritMulti.toFixed(2)}
                    onClick={() => setActiveTab("crit")}
                    active={activeTab === "crit"}
                />

                <OverviewCard
                    name="UW damage"
                    value={totalUWDamage.toFixed(2)}
                    onClick={() => setActiveTab("uw")}
                    active={activeTab === "uw"}
                />
            </div>
            <div className="rounded-xl border p-6 shadow-sm min-h-[300px]">
                {!activeTab && (
                    <p className="text-center text-muted-foreground pt-10">
                        Select a category above to start calculating.
                    </p>
                )}

                {activeTab === "damage" && <DamageMenu data={build.dmg} setBuild={setBuild}/>}
                {activeTab === "crit" && (
                    <CritMenu build={build} setBuild={setBuild} />
                )}
                {activeTab === "uw" &&
                 <UWMenu data={build.uw} setBuild={setBuild}/>
                 }
            </div>
        </div>
    );
}

export default App;
