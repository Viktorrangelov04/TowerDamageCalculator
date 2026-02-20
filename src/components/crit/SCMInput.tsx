import { CRIT_MASTERY_STATS, SUBSTAT_RARITIES, SUPER_CRIT_MULTI_SUBS, SUPER_CRIT_MULTI_VAULT } from "@/data/constants";
import LevelPicker from "../LevelPicker";
import { Label } from "../ui/label";
import { Switch } from "../ui/switch";
import SubstatPicker from "../SubstatPicker";
import { Slider } from "../ui/slider";
import type { SCMBuild } from "@/types";

interface SCMInputProps {
    data: SCMBuild; 
    onUpdateField: (field: keyof SCMBuild, value: any) => void;
    hasMastery: boolean;
    setHasMastery: (val: boolean) => void;
    masteryValue: number;
    setMasteryValue: (val: number) => void;
    hasAssist: boolean;
    setHasAssist: (val: boolean) => void;
    assistSubstatEfficiency: number;
    setAssistSubstatEfficiency: (val: number) => void;
}

export default function SCMInput({
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
}: SCMInputProps) {
    return (
        <div className="space-y-10">
            <header className="border-b pb-4">
                <h2 className="text-xl font-bold">Super Crit Multi Sources</h2>
            </header>

            <section className="py-4">
                <div className="flex justify-between">
                    <h3>Workshop Base</h3>
                    <span className="text-sm font-bold text-primary">13.2x</span>
                </div>
            </section>

            {/* Lab Slider */}
            <section>
                <Label className="text-sm font-semibold pr-2">Lab</Label>
                <div className="flex justify-between py-2">
                    <Slider
                        value={[data.labValue || 1]}
                        max={1.8}
                        step={0.02}
                        min={1}
                        onValueChange={(v) => onUpdateField("labValue", v[0])}
                        className="w-1/2"
                    />
                    <span>{data.labValue}</span>
                </div>
            </section>

            {/* Workshop Enhancement Slider */}
            <section>
                <Label className="text-sm font-semibold pr-2">Workshop Enhancement</Label>
                <div className="flex justify-between py-2">
                    <Slider
                        value={[data.workshopEnhancementValue || 1]}
                        max={5}
                        step={0.01}
                        min={1}
                        onValueChange={(v) => onUpdateField("workshopEnhancementValue", v[0])}
                        className="w-1/2"
                    />
                    <span>{data.workshopEnhancementValue}</span>
                </div>
            </section>

            {/* Mastery Toggle & Picker */}
            <div className="space-y-4">
                <div className="flex items-center gap-2">
                    <Label className="text-sm font-semibold">Mastery Unlocked?</Label>
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

            {/* Substats Section */}
            <section className="py-4 space-y-4">
                <SubstatPicker
                    label="Main sub"
                    levels={SUPER_CRIT_MULTI_SUBS}
                    currentLevel={data.substatValue}
                    efficiency={100}
                    rarities={SUBSTAT_RARITIES}
                    onChange={(val) => onUpdateField("substatValue", val)}
                />

                <div className="space-y-4">
                    <div className="flex items-center gap-2">
                        <Label className="text-sm font-semibold">Cannon Assist Unlocked?</Label>
                        <Switch checked={hasAssist} onCheckedChange={setHasAssist} />
                    </div>
                    {hasAssist && (
                        <div className="space-y-4 border-l-2 pl-4">
                            <Label className="text-sm font-semibold">Substat efficiency ({assistSubstatEfficiency}%)</Label>
                            <Slider
                                value={[assistSubstatEfficiency]}
                                max={100}
                                onValueChange={(v) => setAssistSubstatEfficiency(v[0])}
                                className="w-1/2"
                            />
                            <SubstatPicker
                                label="Assist sub"
                                levels={SUPER_CRIT_MULTI_SUBS}
                                currentLevel={data.assistSubstatValue}
                                efficiency={assistSubstatEfficiency}
                                rarities={SUBSTAT_RARITIES}
                                onChange={(val) => onUpdateField("assistSubstatValue", val)}
                            />
                        </div>
                    )}
                </div>
            </section>

            {/* Relics Slider */}
            <section>
                <Label className="text-sm font-semibold pr-2">Relics</Label>
                <div className="flex justify-between py-2">
                    <Slider
                        value={[data.relicValue || 0]}
                        max={5}
                        onValueChange={(v) => onUpdateField("relicValue", v[0])}
                        className="w-1/2"
                    />
                    <span>{data.relicValue}</span>
                </div>
            </section>
            
            {/* Vault LevelPicker */}
            <section>
                <LevelPicker
                    label="Vault"
                    levels={SUPER_CRIT_MULTI_VAULT}
                    currentLevel={data.vaultValue}
                    onChange={(val) => onUpdateField("vaultValue", val)}
                />
            </section>
        </div>
    )
}