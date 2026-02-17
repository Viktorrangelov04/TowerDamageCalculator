import { Label } from "../ui/label";
import { Slider } from "../ui/slider";
import { CRIT_FACTOR_SUBS, CRIT_FACTOR_VAULT } from "@/data/constants";
import SubstatPicker from "../SubstatPicker";
import { Switch } from "../ui/switch";
import LevelPicker from "../LevelPicker";
import type { CFBuild } from "@/types";

interface CFInputProps {
    data: CFBuild; 
    onUpdateField: (field: keyof CFBuild, value: any) => void; 
    hasAssist: boolean;
    setHasAssist: (val: boolean) => void;
    assistSubstatEfficiency: number;
    setAssistSubstatEfficiency: (val: number) => void;
}

export default function CFInput({
    data,
    onUpdateField,
    hasAssist,
    setHasAssist,
    assistSubstatEfficiency,
    setAssistSubstatEfficiency,
}: CFInputProps) {

    return (
        <div className="space-y-10">
            <header className="border-b pb-4">
                <h2 className="text-xl font-bold">Critical Factor Sources</h2>
            </header>

            {/* Workshop menu (Hardcoded display) */}
            <section className="space-y-4">
                <div className="flex justify-between">
                    <h3>Workshop Base</h3>
                    <span className="text-sm font-bold text-primary">16.2</span>
                </div>
            </section>

            {/* Lab Menu */}
            <section>
                <Label className="text-sm font-semibold pr-2">Lab</Label>
                <div className="flex justify-between py-2">
                    <Slider
                        value={[data.labValue || 1]}
                        max={3.97}
                        step={0.03}
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

            {/* Substats Section */}
            <section className="space-y-4">
                <SubstatPicker
                    label="Main sub"
                    levels={CRIT_FACTOR_SUBS}
                    currentLevel={data.substatValue}
                    efficiency={100}
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
                                levels={CRIT_FACTOR_SUBS}
                                currentLevel={data.assistSubstatValue}
                                efficiency={assistSubstatEfficiency}
                                onChange={(val) => onUpdateField("assistSubstatValue", val)}
                            />
                        </div>
                    )}
                </div>
            </section>

            {/* Relics */}
            <section>
                <Label className="text-sm font-semibold">Relic Crit Factor</Label>
                <div className="flex justify-between py-2">
                    <Slider
                        value={[data.relicValue || 0]}
                        max={98}
                        onValueChange={(v) => onUpdateField("relicValue", v[0])}
                        className="w-1/2"
                    />
                    <span>{data.relicValue}</span>
                </div>
            </section>

            {/* Vault */}
            <section>
                <LevelPicker
                    label="Vault"
                    levels={CRIT_FACTOR_VAULT}
                    currentLevel={data.vaultValue}
                    onChange={(val) => onUpdateField("vaultValue", val)}
                />
            </section>
        </div>
    );
}