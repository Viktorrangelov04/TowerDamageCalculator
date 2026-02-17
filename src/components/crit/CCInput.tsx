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

import type { CCBuild } from "@/types";

interface CCInputProps {
    data: CCBuild; 
    hasMastery: boolean;
    masteryValue: number;
    hasAssist: boolean;
    assistSubstatEfficiency: number;
   
    onUpdateField: (field: keyof CCBuild, value: any) => void;
    setHasMastery: (val: boolean) => void;
    setMasteryValue: (val: number) => void;
    setHasAssist: (val: boolean) =>void;
    setAssistSubstatEfficiency: (val:number) =>void;
}

export default function CCInput({
    data,
    hasMastery,
    masteryValue,
    hasAssist,
    assistSubstatEfficiency,
    onUpdateField,
    setHasMastery,
    setMasteryValue,
    setHasAssist,
    setAssistSubstatEfficiency,
}: CCInputProps) {

    return (

        
        <div className="space-y-10">
            <header className="border-b pb-4">
                <h2 className="text-xl font-bold">Crit Chance sources</h2>
            </header>

            <section className="py-4">
                <div className="flex justify-between">
                    <h3>Workshop</h3>
                    <span className="text-sm font-bold text-primary">80%</span>
                </div>
            </section>

            {/* Card Section */}
            <section className="space-y-4">
                <LevelPicker
                    label="Crit Card Level"
                    levels={CRIT_CARD_STATS}
                    currentLevel={data.cardValue} 
                    onChange={(val) => onUpdateField("cardValue", val)}
                />
                
                <div className="flex items-center gap-2">
                    <Label className="text-sm font-semibold">Mastery Unlocked?</Label>
                    <Switch checked={hasMastery} onCheckedChange={setHasMastery} />
                </div>

                {hasMastery && (
                    <LevelPicker
                        label="Mastery Level"
                        levels={CRIT_MASTERY_STATS}
                        currentLevel={masteryValue}
                        onChange={setMasteryValue}
                    />
                )}
            </section>

            {/* Substats Section */}
            <section className="space-y-4">
                <SubstatPicker
                    label="Main sub"
                    levels={CRIT_CHANCE_SUBS}
                    currentLevel={data.substatValue}
                    efficiency={100}
                    onChange={(val) => onUpdateField("substatValue", val)}
                />

                <div className="flex items-center gap-2">
                    <Label className="text-sm font-semibold">Cannon Assist?</Label>
                   
                    <Switch checked={hasAssist} onCheckedChange={setHasAssist} />
                </div>

                {hasAssist && (
                    <div className="space-y-4 border-l-2 pl-4">
                        <Label>Substat efficiency ({assistSubstatEfficiency}%)</Label>
                        <Slider
                            value={[assistSubstatEfficiency]}
                            max={100}
                            onValueChange={(val) => setAssistSubstatEfficiency(val[0])}
                            className="w-1/2"
                        />
                        <SubstatPicker
                            label="Assist sub"
                            levels={CRIT_CHANCE_SUBS}
                            currentLevel={data.assistSubstatValue}
                            efficiency={assistSubstatEfficiency}
                            onChange={(val) => onUpdateField("assistSubstatValue", val)}
                        />
                    </div>
                )}
            </section>

            {/* Relics */}
            <section className="space-y-2">
                <Label>Relic Crit ({data.relicValue})</Label>
                <Slider
                    value={[data.relicValue]}
                    max={9}
                    onValueChange={(val) => onUpdateField("relicValue", val[0])}
                    className="w-1/2"
                />
            </section>

            {/* Vault */}
            <section>
                <LevelPicker
                    label="Vault"
                    levels={CRIT_VAULT}
                    currentLevel={data.vaultValue}
                    onChange={(val) => onUpdateField("vaultValue", val)}
                />
            </section>
        </div>
    );
}