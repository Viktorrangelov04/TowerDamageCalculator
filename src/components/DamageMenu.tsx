import type { PlayerBuild } from "@/types";
import { useState } from "react";
import OverviewCard from "./OverviewCard";
import BaseDamageMenu from "./BaseDamageMenu";
import DamageMeterMenu from "./DamageMeterMenu";
import AdditinalDamageMenu from "./AdditionalDamageMenu";
import {
    calculateBaseDamage,
    calculateTotalDamageMeter,
    calculateTotalDamageMulti,
} from "@/utils/calculations";
import { formatCompactNumber } from "@/utils/numberFormatter";

interface DamageProps {
    build: any;
    setBuild: React.Dispatch<React.SetStateAction<PlayerBuild>>;
    setHasSL: (val: boolean) => void;
    setHasAssist: (val: boolean) => void;
    setAssistSubstatEfficiency: (val: number) => void;
}

export default function DamageMenu({
    build,
    setBuild,
    setHasSL,
    setHasAssist,
    setAssistSubstatEfficiency,
}: DamageProps) {
    const [activeTab, setActiveTab] = useState("damage");
    
    const baseDamage = calculateBaseDamage({
        ...build.dmg,
    });

    const damageMeter = calculateTotalDamageMeter({
        ...build.dmg,
        hasAssist: build.hasAssist,
        assistSubstatEfficiency: build.assistSubstatEfficiency,
    });

    const damageMulti = calculateTotalDamageMulti({
        ...build.dmg,
        hasAssist: build.hasAssist,
        hasSL: build.hasSL,
        assistSubstatEfficiency: build.assistSubstatEfficiency
    })

    return (
        <div className="space-y-6">
            <h2 className="text-xl font-bold">Damage Configuration</h2>
            <div className="mx-auto grid grid-cols-1 md:grid-cols-3 gap-6">
                <OverviewCard
                    name="BaseDamage"
                    value={formatCompactNumber(baseDamage)}
                    onClick={() => setActiveTab("damage")}
                    active={activeTab === "damage"}
                />
                <OverviewCard
                    name="Damage Multi"
                    value={damageMulti.toFixed()}
                    onClick={() => setActiveTab("damageMulti")}
                    active={activeTab === "damageMulti"}
                    prefix="x"
                />
                <OverviewCard
                    name="Damage/meter"
                    value={damageMeter.toFixed(3)}
                    onClick={() => setActiveTab("damage/meter")}
                    active={activeTab === "damage/meter"}
                />
            </div>

            {activeTab === "damage" && (
                <BaseDamageMenu data={build.dmg} setBuild={setBuild} />
            )}

            {activeTab == "damageMulti" && (
                <AdditinalDamageMenu
                    data={build.dmg}
                    setBuild={setBuild}
                    hasSL={build.hasSL}
                    setHasSL={setHasSL}
                />
            )}
            {activeTab === "damage/meter" && (
                <DamageMeterMenu
                    data={build.dmg}
                    setBuild={setBuild}
                    hasAssist={build.hasAssist}
                    assistSubstatEfficiency={build.assistSubstatEfficiency}
                    setHasAssist={setHasAssist}
                    setAssistSubstatEfficiency={setAssistSubstatEfficiency}
                />
            )}
        </div>
    );
}
