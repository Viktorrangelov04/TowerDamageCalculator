import type { DMGBuild, PlayerBuild } from "@/types";
import { Slider } from "./ui/slider";
import SubstatPicker from "./SubstatPicker";
import {
    DPM_RELICS_MAX,
    DPM_SUBS,
    DPM_VAULT,
    RANGE_MASTERY_STATS,
    SUBSTAT_RARITIES,
} from "@/data/constants";
import { Label } from "./ui/label";
import { Switch } from "./ui/switch";
import LevelPicker from "./LevelPicker";
import { StatInput } from "./StatInput";

interface damageMeterMenuProps {
    data: DMGBuild;
    setBuild: React.Dispatch<React.SetStateAction<PlayerBuild>>;
    hasAssist: boolean;
    assistSubstatEfficiency: number;
    setHasAssist: (val: boolean) => void;
    setAssistSubstatEfficiency: (val: number) => void;
}

export default function damageMeterMenu({
    data,
    setBuild,
    hasAssist,
    assistSubstatEfficiency,
    setHasAssist,
    setAssistSubstatEfficiency,
}: damageMeterMenuProps) {
    const updateField = (field: keyof DMGBuild, value: any) => {
        setBuild((prev) => ({
            ...prev,
            dmg: { ...prev.dmg, [field]: value },
        }));
    };

    return (
        <div className="space-y-6">
            <h1 className="border-b pb-4">Damage/Meter sources</h1>
            <p>Lab Bonus</p>
            <div className="flex justify-between">
                <Slider
                    value={[data.damageMeterLab || 1]}
                    max={2.98}
                    step={0.02}
                    min={1}
                    onValueChange={(v) => updateField("damageMeterLab", v[0])}
                    className="w-1/2"
                />
                <span>x{data.damageMeterLab}</span>
            </div>

            <div className="flex justify-between">
                <p>Workshop Enhancement</p>
                <span>x{data.damageMeterEnhancement}</span>
            </div>

            <Slider
                value={[data.damageMeterEnhancement || 1]}
                max={5}
                step={0.01}
                min={1}
                onValueChange={(v) =>
                    updateField("damageMeterEnhancement", v[0])
                }
                className="w-1/2"
            />
            <SubstatPicker
                label="Main sub"
                levels={DPM_SUBS}
                currentLevel={data.substatValue}
                efficiency={100}
                onChange={(val) => updateField("substatValue", val)}
                rarities={SUBSTAT_RARITIES}
            />

            <div className="flex items-center gap-2">
                <Label className="text-sm font-semibold">Cannon Assist?</Label>

                <Switch checked={hasAssist} onCheckedChange={setHasAssist} />
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
                        levels={DPM_SUBS}
                        currentLevel={data.assistSubstatValue}
                        efficiency={assistSubstatEfficiency}
                        onChange={(val) =>
                            updateField("assistSubstatValue", val)
                        }
                        rarities={SUBSTAT_RARITIES}
                    />
                </div>
            )}
            <Label>Relic </Label>
            <div className="flex justify-between">
                <Slider
                    value={[data.damageMeterRelics]}
                    max={DPM_RELICS_MAX}
                    min={0}
                    onValueChange={(val) =>
                        updateField("damageMeterRelics", val[0])
                    }
                    className="w-1/2"
                />
                <span>{data.damageMeterRelics}%</span>
            </div>

            <LevelPicker
                label="Vault"
                levels={DPM_VAULT}
                currentLevel={data.damageMeterVault}
                onChange={(val) => updateField("damageMeterVault", val)}
                prefix=""
            />

            <div className="flex gap-2 items-center">
                <Label>Range Mastery Unlocked?</Label>
                <Switch
                    checked={data.hasRangeMastery}
                    onCheckedChange={(v) => updateField("hasRangeMastery", v)}
                />
            </div>

            {data.hasRangeMastery ? (
                <LevelPicker
                    label="Mastery Level"
                    levels={RANGE_MASTERY_STATS}
                    currentLevel={data.RangeMasteryValue}
                    onChange={(val) => updateField("RangeMasteryValue", val)}
                />
            ) : (
                <div className="w-full text-center p-6 border-2 border-dashed rounded-lg text-muted-foreground text-sm">
                    Enable Mastery to configure levels
                </div>
            )}
            <StatInput
                label="Range"
                value={data.range}
                onChange={(v) => updateField("range", v)}
                min={1}
                max={270}
                unit=""
            />

            <div className="flex gap-2 items-center">
                <Label>Scout Unlocked?</Label>
                <Switch
                    checked={data.hasScout}
                    onCheckedChange={(v) => updateField("hasScout", v)}
                />
            </div>

            {data.hasScout ? (
                <div>
                    <Label>Scout bonus</Label>
                    <div className="flex justify-between py-5">
                        <Slider
                            value={[data.scoutValue]}
                            max={6}
                            step={0.1}
                            min={2}
                            onValueChange={(val) =>
                                updateField("scoutValue", val[0])
                            }
                            className="w-1/2"
                        />
                        <span>x{data.scoutValue}</span>
                    </div>
                </div>
            ) : (
                <div className="w-full text-center p-6 border-2 border-dashed rounded-lg text-muted-foreground text-sm">
                    Unlock scout to configure levels
                </div>
            )}
        </div>
    );
}
