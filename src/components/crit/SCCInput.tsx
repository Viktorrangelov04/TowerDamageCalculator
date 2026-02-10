import { useEffect } from "react";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import LevelPicker from "../LevelPicker";
import {
    CRIT_MASTERY_STATS,
    SUPER_CRIT_SUBS,
    SUPER_CRIT_VAULT,
} from "@/data/constants";
import { Switch } from "../ui/switch";
import { calculateTotalSuperCrit } from "@/utils/calculations";
import { Slider } from "../ui/slider";
import SubstatPicker from "../SubstatPicker";

interface SCCInputProps {
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
export default function SCCInput({
    hasMastery,
    setHasMastery,
    mastLvl,
    setMastLvl,
    hasAssist,
    setHasAssist,
    assistSubstatEfficiency,
    setAssistSubstatEfficiency,
    onUpdate,
}: SCCInputProps) {
    const [substatValue, setSubstatValue] = useState(0);
    const [assistSubstatValue, setAssistSubstatValue] = useState(0);
    const [relicValue, setRelicValue] = useState(0);
    const [vaultValue, setVaultValue] = useState(0);
    const [labValue, setLabValue] = useState(0);

    const totalSuperCrit = calculateTotalSuperCrit({
        masteryValue: CRIT_MASTERY_STATS[mastLvl],
        hasMastery: hasMastery,
        hasAssist: hasAssist,
        substatValue: SUPER_CRIT_SUBS[substatValue],
        efficiency: assistSubstatEfficiency,
        assistValue: SUPER_CRIT_SUBS[assistSubstatValue],
        relicValue: relicValue,
        labValue: labValue,
        vaultValue: SUPER_CRIT_VAULT[vaultValue],
    });

    useEffect(() => {
        onUpdate(totalSuperCrit);
    }, [totalSuperCrit]);

    return (
        <div className="space-y-10">
            <header className="border-b pb-4">
                <h2 className="text-xl font-bold">Super Crit Chance Sources</h2>
            </header>
            <section className="py-4">
                <div className="flex justify-between">
                    <h3>Workshop</h3>
                    <span className="text-sm font-bold text-primary">20%</span>
                </div>
            </section>
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
                            label="Crit Mastery Level"
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
            <section className="py-4">
                <SubstatPicker
                    label="Main sub"
                    levels={SUPER_CRIT_SUBS}
                    currentLevel={substatValue}
                    efficiency={100}
                    onChange={setSubstatValue}
                />

                <div className="py-4">
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
                                <Label className="text-sm font-semibold text-gray-700 pr-2">
                                    Substat efficiency
                                </Label>
                                <div className="flex justify-between py-2">
                                    <Slider
                                        defaultValue={[assistSubstatEfficiency]}
                                        max={100}
                                        min={0}
                                        onValueChange={(value) => {
                                            setAssistSubstatEfficiency(
                                                value[0]
                                            );
                                        }}
                                        className="w-1/2"
                                    />
                                    <span>{assistSubstatEfficiency}</span>
                                </div>

                                <SubstatPicker
                                    label="Assist sub"
                                    levels={SUPER_CRIT_SUBS}
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

            <section>
                <Label className="text-sm font-semibold text-gray-700 pr-2">
                    Relics
                </Label>
                <div className="flex justify-between py-2">
                    <Slider
                        defaultValue={[0]}
                        max={6}
                        min={0}
                        onValueChange={(value) => {
                            setRelicValue(value[0]);
                        }}
                        className="w-1/2"
                    />
                    <span>{relicValue}</span>
                </div>
            </section>

            <section>
                <Label className="text-sm font-semibold text-gray-700 pr-2">
                    Lab
                </Label>
                <div className="flex justify-between py-2">
                    <Slider
                        defaultValue={[0]}
                        max={5}
                        step={0.1}
                        min={0}
                        onValueChange={(value) => {
                            setLabValue(value[0]);
                        }}
                        className="w-1/2"
                    />
                    <span>{labValue}</span>
                </div>
            </section>

            <section>
                <div className="">
                    <LevelPicker
                        label="Vault"
                        levels={SUPER_CRIT_VAULT}
                        currentLevel={vaultValue}
                        onChange={setVaultValue}
                    />
                </div>
            </section>
        </div>
    );
}
