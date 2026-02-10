import { useState, useEffect } from "react";

import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Slider } from "@/components/ui/slider";
import LevelPicker from "../LevelPicker";
import SubstatPicker from "../SubstatPicker";
import {
    CRIT_CARD_STATS,
    CRIT_MASTERY_STATS,
    CRIT_CHANCE_SUBS,
    CRIT_VAULT,
} from "@/data/constants";

import { calculateTotalCrit } from "@/utils/calculations";

interface CCInputProps {
    onUpdate: (value: number) => void;
    hasMastery: boolean;
    setHasMastery: (val: boolean) => void;
    mastLvl: number;
    setMastLvl: (val: number) => void;
    hasAssist: boolean;
    setHasAssist: (val: boolean) => void;
    assistSubstatEfficiency: number;
    setAssistSubstatEfficiency: (val: number) => void;
}

export default function CCInput({
    hasMastery,
    setHasMastery,
    mastLvl,
    setMastLvl,
    hasAssist,
    setHasAssist,
    assistSubstatEfficiency,
    setAssistSubstatEfficiency,
    onUpdate,
}: CCInputProps) {
    const [cardLvl, setCardLvl] = useState(0);
    const [substatValue, setSubstatValue] = useState(0);
    const [assistSubstatValue, setAssistSubstatValue] = useState(0);
    const [relicValue, setRelicValue] = useState(0);
    const [vaultValue, setVaultValue] = useState(0);

    const totalCrit = calculateTotalCrit({
        cardValue: CRIT_CARD_STATS[cardLvl],
        masteryValue: CRIT_MASTERY_STATS[mastLvl],
        hasMastery: hasMastery,
        substatValue: CRIT_CHANCE_SUBS[substatValue],
        hasAssist: hasAssist,
        efficiency: assistSubstatEfficiency,
        assistValue: CRIT_CHANCE_SUBS[assistSubstatValue],
        relicsValue: relicValue,
        vaultValue: vaultValue,
    });

    useEffect(() => {
        onUpdate(totalCrit);
    }, [totalCrit]);

    return (
        <div className="space-y-10">
            <header className="border-b pb-4">
                <h2 className="text-xl font-bold">Critical Chance Sources</h2>
            </header>

            {/* Workshop menu */}
            <section className="space-y-4">
                <div className="flex justify-between">
                    <h3>Workshop</h3>
                    <span className="text-sm font-bold text-primary">80%</span>
                </div>
            </section>
            {/* Card menu  */}
            <section className="space-y-4">
                <div className="space-y-8">
                    <LevelPicker
                        label="Crit Card Level"
                        levels={CRIT_CARD_STATS}
                        currentLevel={cardLvl}
                        onChange={setCardLvl}
                    />
                </div>
                <div className="space-y-4">
                    <div className="flex items-center">
                        <Label className="text-sm font-semibold text-gray-700 pr-2">
                            Mastery Unlocked?
                        </Label>

                        <Switch
                            checked={hasMastery}
                            onCheckedChange={setHasMastery}
                        />
                    </div>

                    {hasMastery ? (
                        <div className="">
                            <LevelPicker
                                label="Mastery Level"
                                levels={CRIT_MASTERY_STATS}
                                currentLevel={mastLvl}
                                onChange={setMastLvl}
                            />
                        </div>
                    ) : (
                        <div className="w-full text-center p-6 border-2 border-dashed rounded-lg text-muted-foreground text-sm">
                            Enable Mastery to configure levels
                        </div>
                    )}
                </div>
            </section>

            {/* Substats */}
            <section className="space-y-4">
                <SubstatPicker
                    label="Main sub"
                    levels={CRIT_CHANCE_SUBS}
                    currentLevel={substatValue}
                    efficiency={100}
                    onChange={setSubstatValue}
                />

                <div className="space-y-4">
                    <div className="flex items-center">
                        <Label className="text-sm font-semibold text-gray-700 pr-2">
                            Cannon Assist Unlocked?
                        </Label>

                        <Switch
                            checked={hasAssist}
                            onCheckedChange={setHasAssist}
                        />
                    </div>
                    <div>
                        {hasAssist ? (
                            <div>
                                <Label className="space-y-4 text-sm font-semibold text-gray-700 pr-2">
                                    Substat efficiency
                                </Label>
                                <div className="flex justify-between py-2">
                                    <Slider
                                        defaultValue={[assistSubstatEfficiency]}
                                        max={100}
                                        min={0}
                                        onValueChange={(value) => {
                                            setAssistSubstatEfficiency(value[0]);
                                        }}
                                        className="w-1/2"
                                    />
                                    <span>{assistSubstatEfficiency}</span>
                                </div>

                                <SubstatPicker
                                    label="Assist sub"
                                    levels={CRIT_CHANCE_SUBS}
                                    currentLevel={assistSubstatValue}
                                    efficiency={assistSubstatEfficiency}
                                    onChange={setAssistSubstatValue}
                                />
                            </div>
                        ) : (
                            <div className="w-full text-center p-6 border-2 border-dashed rounded-lg text-muted-foreground text-sm">
                                Enable Cannon Assist to configure levels
                            </div>
                        )}
                    </div>
                </div>
            </section>
            {/* Relics                 */}
            <section>
                <Label className="text-sm font-semibold text-gray-700 pr-2">
                    Relic crit
                </Label>
                <div className="flex justify-between py-2">
                    <Slider
                        defaultValue={[0]}
                        max={9}
                        min={0}
                        onValueChange={(value) => {
                            setRelicValue(value[0]);
                        }}
                        className="w-1/2"
                    />
                    <span>{relicValue}</span>
                </div>
            </section>

            {/* Vault */}
            <section>
                <div className="space-y-4">
                    <LevelPicker
                        label="Vault"
                        levels={CRIT_VAULT}
                        currentLevel={vaultValue}
                        onChange={setVaultValue}
                    />
                </div>
            </section>
        </div>
    );
}
