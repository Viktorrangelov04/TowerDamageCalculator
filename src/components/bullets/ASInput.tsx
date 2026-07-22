import type { ASBuild } from "@/types";
import { Slider } from "../ui/slider";
import { Label } from "../ui/label";
import {
    AS_CARD,
    AS_MASTERY,
    AS_RELICS_MAX,
    AS_VAULT,
    ATTACK_SPEED_SUBS,
    SUBSTAT_RARITIES,
} from "@/data/constants";
import { Switch } from "../ui/switch";
import LevelPicker from "../LevelPicker";
import SubstatPicker from "../SubstatPicker";

interface ASInputProps {
    data: ASBuild;
    hasAssist: boolean;
    assistSubstatEfficiency: number;

    onUpdateField: (field: keyof ASBuild, value: any) => void;
    setHasAssist: (val: boolean) => void;
    setAssistSubstatEfficiency: (val: number) => void;
}

export default function ASInput({
    data,
    hasAssist,
    assistSubstatEfficiency,
    onUpdateField,
    setHasAssist,
    setAssistSubstatEfficiency,
}: ASInputProps) {
    return (
        <div className="space-y-10">
            <h1>asd</h1>

            <section className="py-4">
                <div className="flex justify-between">
                    <h3>Workshop Base</h3>
                    <span className="text-sm font-bold text-primary">5.95</span>
                </div>
            </section>

            {/* Lab Slider */}
            <section>
                <Label className="text-sm font-semibold pr-2">Lab</Label>
                <div className="flex justify-between py-2">
                    <Slider
                        value={[data.labValue || 1]}
                        max={2.98}
                        step={0.02}
                        min={1}
                        onValueChange={(v) => onUpdateField("labValue", v[0])}
                        className="w-1/2"
                    />
                    <span>x{data.labValue}</span>
                </div>
            </section>

            {/* Workshop Enhancement Slider */}
            <section>
                <Label className="text-sm font-semibold pr-2">
                    Workshop Enhancement
                </Label>
                <div className="flex justify-between py-2">
                    <Slider
                        value={[data.workshopEnhancementValue || 1]}
                        max={2}
                        step={0.01}
                        min={1}
                        onValueChange={(v) =>
                            onUpdateField("workshopEnhancementValue", v[0])
                        }
                        className="w-1/2"
                    />
                    <span>x{data.workshopEnhancementValue}</span>
                </div>
            </section>

            <LevelPicker
                label="Attack Speed Card Level"
                levels={AS_CARD}
                currentLevel={data.cardValue}
                onChange={(val) => onUpdateField("cardValue", val)}
                prefix=""
            />

            <div className="space-y-4">
                <div className="flex items-center gap-2">
                    <Label className="text-sm font-semibold">
                        Mastery Unlocked?
                    </Label>
                    <Switch
                        checked={data.hasMastery}
                        onCheckedChange={(val) =>
                            onUpdateField("hasMastery", val)
                        }
                    />
                </div>

                {data.hasMastery ? (
                    <LevelPicker
                        label="Attack Speed Mastery Level"
                        levels={AS_MASTERY}
                        currentLevel={data.masteryValue}
                        onChange={(val) => onUpdateField("masteryValue", val)}
                        prefix=""
                    />
                ) : (
                    <div className="w-full text-center p-6 border-2 border-dashed rounded-lg text-muted-foreground text-sm">
                        Enable Mastery to configure levels
                    </div>
                )}
            </div>

            <section className="space-y-4">
                <SubstatPicker
                    label="Main sub"
                    levels={ATTACK_SPEED_SUBS}
                    currentLevel={data.substatValue}
                    efficiency={100}
                    onChange={(val) => onUpdateField("substatValue", val)}
                    rarities={SUBSTAT_RARITIES}
                />

                <div className="flex items-center gap-2">
                    <Label className="text-sm font-semibold">
                        Cannon Assist?
                    </Label>

                    <Switch
                        checked={hasAssist}
                        onCheckedChange={setHasAssist}
                    />
                </div>

                {hasAssist && (
                    <div className="space-y-4 border-l-2 pl-4">
                        <Label>
                            Substat efficiency ({assistSubstatEfficiency}%)
                        </Label>
                        <Slider
                            value={[assistSubstatEfficiency]}
                            max={100}
                            onValueChange={(val) =>
                                setAssistSubstatEfficiency(val[0])
                            }
                            className="w-1/2"
                        />
                        <SubstatPicker
                            label="Assist sub"
                            levels={ATTACK_SPEED_SUBS}
                            currentLevel={data.assistSubstatValue}
                            efficiency={assistSubstatEfficiency}
                            onChange={(val) =>
                                onUpdateField("assistSubstatValue", val)
                            }
                            rarities={SUBSTAT_RARITIES}
                        />
                    </div>
                )}
            </section>

            {/* Relics */}
            <section className="space-y-2">
                <Label>Relic Attack Speed</Label>
                <div className="flex justify-between">
                    <Slider
                        value={[data.relicValue]}
                        max={AS_RELICS_MAX}
                        onValueChange={(val) =>
                            onUpdateField("relicValue", val[0])
                        }
                        className="w-1/2"
                    />
                    <span>+{data.relicValue}%</span>
                </div>
            </section>

            <section>
                <LevelPicker
                    label="Vault"
                    levels={AS_VAULT}
                    currentLevel={data.vaultValue}
                    onChange={(val) => onUpdateField("vaultValue", val)}
                />
            </section>

            
        </div>
    );
}
