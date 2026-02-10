import { useEffect, useState } from "react";
import { Label } from "../ui/label";
import { Slider } from "../ui/slider";
import { CRIT_FACTOR_SUBS, CRIT_FACTOR_VAULT } from "@/data/constants";
import SubstatPicker from "../SubstatPicker";
import { Switch } from "../ui/switch";
import LevelPicker from "../LevelPicker";
import { calculateTotalCritFactor } from "@/utils/calculations";

interface CFInputProps {
    onUpdate: (value: number) => void;
    hasAssist: boolean;
    setHasAssist: (val: boolean) => void;
    assistSubstatEfficiency: number;
    setAssistSubstatEfficiency: (val: number) => void;
}
export default function CFInput({
    hasAssist,
    setHasAssist,
    assistSubstatEfficiency,
    setAssistSubstatEfficiency,
    onUpdate,
}: CFInputProps) {
    const [workshopEnhancementValue, setWorkshopEnhancementValue] = useState(1);
    const [labValue, setLabValue] = useState(1);
    const [substatValue, setSubstatValue] = useState(0);
    const [assistSubstatValue, setAssistSubstatValue] = useState(0);
    const [relicValue, setRelicValue] = useState(0);
    const [vaultValue, setVaultValue] = useState(0);

    const totalCritFactor = calculateTotalCritFactor({
        substatValue: CRIT_FACTOR_SUBS[substatValue],
        hasAssist: hasAssist,
        efficiency: assistSubstatEfficiency,
        assistValue: CRIT_FACTOR_SUBS[assistSubstatValue],
        relicValue: relicValue,
        labValue: labValue,
        vaultValue: CRIT_FACTOR_VAULT[vaultValue],
        workshopEnhancementValue: workshopEnhancementValue,
    });
    useEffect(() => {
        onUpdate(totalCritFactor);
    }, [totalCritFactor]);
    return (
        <div className="space-y-10">
            <header className="border-b pb-4">
                <h2 className="text-xl font-bold">Critical Factor Sources</h2>
            </header>

            {/* Workshop menu */}
            <section className="space-y-4">
                <div className="flex justify-between">
                    <h3>Workshop</h3>
                    <span className="text-sm font-bold text-primary">16.2</span>
                </div>
            </section>

            {/* Lab Menu */}
            <section>
                <Label className="text-sm font-semibold text-gray-700 pr-2">
                    Lab
                </Label>
                <div className="flex justify-between py-2">
                    <Slider
                        defaultValue={[0]}
                        max={3.97}
                        step={0.03}
                        min={1}
                        onValueChange={(value) => {
                            setLabValue(value[0]);
                        }}
                        className="w-1/2"
                    />
                    <span>{labValue}</span>
                </div>
            </section>

            {/* Workshop+ Menu */}
            <section>
                <Label className="text-sm font-semibold text-gray-700 pr-2">
                    Workshop Enhancement
                </Label>
                <div className="flex justify-between py-2">
                    <Slider
                        defaultValue={[1]}
                        max={5}
                        step={0.01}
                        min={1}
                        onValueChange={(value) => {
                            setWorkshopEnhancementValue(value[0]);
                        }}
                        className="w-1/2"
                    />
                    <span>{workshopEnhancementValue}</span>
                </div>
            </section>

            <section className="space-y-4">
                <SubstatPicker
                    label="Main sub"
                    levels={CRIT_FACTOR_SUBS}
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
                                    levels={CRIT_FACTOR_SUBS}
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
                    Relic crit
                </Label>
                <div className="flex justify-between py-2">
                    <Slider
                        defaultValue={[0]}
                        max={98}
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
                        levels={CRIT_FACTOR_VAULT}
                        currentLevel={vaultValue}
                        onChange={setVaultValue}
                    />
                </div>
            </section>
        </div>
    );
}
