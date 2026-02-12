import { Label } from "@/components/ui/label";
import LevelPicker from "../LevelPicker";
import {
    CRIT_MASTERY_STATS,
    SUPER_CRIT_SUBS,
    SUPER_CRIT_VAULT,
} from "@/data/constants";
import { Switch } from "../ui/switch";
import { Slider } from "../ui/slider";
import SubstatPicker from "../SubstatPicker";
import type { SCCBuild } from "@/types";

interface SCCInputProps {
    data: SCCBuild;
    onUpdateField: (field: keyof SCCBuild, value: any) => void;
    hasMastery: boolean;
    setHasMastery: (v: boolean) => void;
    masteryValue: number;
    setMasteryValue: (v: number) => void;
    hasAssist: boolean;
    setHasAssist: (v: boolean) => void;
    assistSubstatEfficiency: number;
    setAssistSubstatEfficiency: (v: number) => void;
    onUpdate?: (v: number) => void;
}

export default function SCCInput({
    data,
    onUpdateField,
    hasMastery,
    setHasMastery,
    masteryValue,
    setMasteryValue,
    hasAssist,
    setHasAssist,
    assistSubstatEfficiency,
    setAssistSubstatEfficiency,
}: SCCInputProps) {
    
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
                    <Label className="text-sm font-semibold text-gray-700 pr-2">Mastery Unlocked?</Label>
                    <Switch checked={hasMastery} onCheckedChange={setHasMastery} />
                </div>

                {hasMastery ? (
                    <LevelPicker
                        label="Crit Mastery Level"
                        levels={CRIT_MASTERY_STATS}
                        currentLevel={masteryValue}
                        onChange={setMasteryValue}
                    />
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
                    currentLevel={data.substatValue}
                    efficiency={100}
                    onChange={(val) => onUpdateField("substatValue", val)}
                />

                <div className="py-4">
                    <div className="flex items-center">
                        <Label className="text-sm font-semibold text-gray-700 pr-2">Cannon Assist Unlocked?</Label>
                        <Switch checked={hasAssist} onCheckedChange={setHasAssist} />
                    </div>
                    {hasAssist && (
                        <div className="mt-4 space-y-4">
                            <Label className="text-sm font-semibold text-gray-700">Substat efficiency ({assistSubstatEfficiency}%)</Label>
                            <Slider
                                value={[assistSubstatEfficiency]}
                                max={100}
                                onValueChange={(v) => setAssistSubstatEfficiency(v[0])}
                                className="w-1/2"
                            />
                            <SubstatPicker
                                label="Assist sub"
                                levels={SUPER_CRIT_SUBS}
                                currentLevel={data.assistSubstatValue}
                                efficiency={assistSubstatEfficiency}
                                onChange={(val) => onUpdateField("assistSubstatValue", val)}
                            />
                        </div>
                    )}
                </div>
            </section>

            <section>
                <Label className="text-sm font-semibold text-gray-700 pr-2">
                    Relics
                </Label>
                <div className="flex justify-between py-2">
                    <Slider
                        value={[data.relicValue || 0]}
                        max={6}
                        onValueChange={(value) =>
                            onUpdateField("relicValue", value[0])
                        }
                        className="w-1/2"
                    />
                    <span>{data.relicValue || 0}</span>
                </div>
            </section>

            <section>
                <Label className="text-sm font-semibold text-gray-700 pr-2">
                    Lab
                </Label>
                <div className="flex justify-between py-2">
                    <Slider
                        value={[data.labValue || 0]}
                        max={5}
                        step={0.1}
                        onValueChange={(value) =>
                            onUpdateField("labValue", value[0])
                        }
                        className="w-1/2"
                    />
                    <span>{data.labValue || 0}</span>
                </div>
            </section>

            <section>
                <LevelPicker
                    label="Vault"
                    levels={SUPER_CRIT_VAULT}
                    currentLevel={data.vaultValue}
                    onChange={(val) => onUpdateField("vaultValue", val)}
                />
            </section>
        </div>
    );
}
