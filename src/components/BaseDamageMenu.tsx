import type { DMGBuild, PlayerBuild } from "@/types";
import { Slider } from "./ui/slider";
import LevelPicker from "./LevelPicker";
import {
    DAMAGE_CARD_STATS,
    DAMAGE_MASTERY_STATS,
    DEMON_MODE_MASTERY_STATS,
    DMG_RELICS_MAX,
    DMG_VAULT,
    MAINSTAT_RARITIES,
    MAX_LVL_VALUES,
    PF_STATS,
} from "@/data/constants";
import { Switch } from "./ui/switch";
import { StatInput } from "./StatInput";
import SubstatPicker from "./SubstatPicker";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { Button } from "./ui/button";
import { Label } from "./ui/label";
import * as Stats from "@/data/cannonModuleMainStat";
import MainstatRarityPicker from "./mainstatRarityPicker";

interface BaseDamageProps {
    data: DMGBuild;
    setBuild: React.Dispatch<React.SetStateAction<PlayerBuild>>;
}

export const CANNON_RARITY_DATA_MAP: Record<number, number[]> = {
    0: Stats.CANNON_EPIC_LVLS,
    1: Stats.CANNON_LEGENDARY_LVLS,
    2: Stats.CANNON_MYTHICPLUS_LVLS,
    3: Stats.CANNON_ANC_LVLS,
    4: Stats.CANNON_1STAR_LVLS,
    5: Stats.CANNON_2STAR_LVLS,
    6: Stats.CANNON_3STAR_LVLS,
    7: Stats.CANNON_4STAR_LVLS,
    8: Stats.CANNON_5STAR_LVLS,
};

export default function BaseDamageMenu({ data, setBuild }: BaseDamageProps) {
    const updateField = (field: keyof DMGBuild, value: any) => {
        setBuild((prev) => ({
            ...prev,
            dmg: { ...prev.dmg, [field]: value },
        }));
    };

    const moduleMax = MAX_LVL_VALUES[data.cannonRarityMain] ?? 60;

    const currentRarityArray = CANNON_RARITY_DATA_MAP[data.cannonRarityMain] || [];
    const moduleMain = currentRarityArray[data.cannonLvlMain] ?? 0;

    const moduleMaxAssist = MAX_LVL_VALUES[data.cannonRarityAssist] ?? 60;

    const currentRarityAssistArray =
        CANNON_RARITY_DATA_MAP[data.cannonRarityAssist] || [];
    const moduleAssist = currentRarityAssistArray[data.cannonLvlAssist] ?? 0;
    return (
        <div className="space-y-6">
            <h1 className="border-b pb-4">Base damage sources</h1>

            <section className="space-y-4 border-b py-4">
                <div className="flex justify-between">
                    <p>Workshop Damage</p>
                    <p>71.11M</p>
                </div>
                <div className="flex justify-between">
                    <p>Workshop Enhancement</p>
                    <span>x{data.workshopEnhancementValue}</span>
                </div>

                <Slider
                    value={[data.workshopEnhancementValue || 1]}
                    max={5}
                    step={0.01}
                    min={1}
                    onValueChange={(v) =>
                        updateField("workshopEnhancementValue", v[0])
                    }
                    className="w-1/2"
                />
            </section>

            <section className="border-b pb-4">
                <p>Lab Bonus</p>
                <div className="flex justify-between">
                    <Slider
                        value={[data.labValue || 1]}
                        max={3}
                        step={0.02}
                        min={1}
                        onValueChange={(v) => updateField("labValue", v[0])}
                        className="w-1/2"
                    />
                    <span>x{data.labValue}</span>
                </div>
            </section>

            <section className="space-y-4 border-b pb-4">
                <p>Cards</p>
                <LevelPicker
                    label="Damage Card lvl"
                    levels={DAMAGE_CARD_STATS}
                    currentLevel={data.dmgCardValue}
                    onChange={(val) => updateField("dmgCardValue", val)}
                    unit=""
                    prefix="x"
                />

                <div className="flex justify-between">
                    <div className="flex gap-2 items-center">
                        <p>Berserker equipped</p>

                        <Switch
                            checked={data.hasBerserker}
                            onCheckedChange={(v) =>
                                updateField("hasBerserker", v)
                            }
                        />
                    </div>
                    {data.hasBerserker && <p>x8</p>}
                </div>

                <div className="flex justify-between">
                    <div className="flex gap-2 items-center">
                        <p>Berserker Mastery Activated</p>

                        <Switch
                            checked={data.hasBerserkerMastery}
                            onCheckedChange={(v) =>
                                updateField("hasBerserkerMastery", v)
                            }
                        />
                    </div>
                    {data.hasBerserkerMastery && <p>x500</p>}
                </div>

                <div className="flex gap-2 items-center">
                    <p>Damage Mastery Unlocked?</p>
                    <Switch
                        checked={data.hasMastery}
                        onCheckedChange={(v) => updateField("hasMastery", v)}
                    />
                </div>

                {data.hasMastery ? (
                    <LevelPicker
                        label="Damage Mastery Level"
                        levels={DAMAGE_MASTERY_STATS}
                        currentLevel={data.masteryValue}
                        onChange={(v) => updateField("masteryValue", v)}
                        unit=""
                        prefix="x"
                    />
                ) : (
                    <div className="w-full text-center p-6 border-2 border-dashed rounded-lg text-muted-foreground text-sm">
                        Enable Mastery to configure levels
                    </div>
                )}

                <div className="flex gap-2 items-center">
                    <p>Demon Mode Mastery Unlocked?</p>
                    <Switch
                        checked={data.hasDMMastery}
                        onCheckedChange={(v) => updateField("hasDMMastery", v)}
                    />
                </div>

                {data.hasDMMastery ? (
                    <LevelPicker
                        label="Demon Mode Mastery Level"
                        levels={DEMON_MODE_MASTERY_STATS}
                        currentLevel={data.DMMasteryValue}
                        onChange={(v) => updateField("DMMasteryValue", v)}
                        unit=""
                        prefix="x"
                    />
                ) : (
                    <div className="w-full text-center p-6 border-2 border-dashed rounded-lg text-muted-foreground text-sm">
                        Enable Mastery to configure levels
                    </div>
                )}
            </section>

            <section className="space-y-4 border-b pb-4">
                <p> Modules </p>
                <section className="flex gap-2">
                                <MainstatRarityPicker
                                    label="Main Cannon Rarity"
                                    currentLevel={data.cannonRarityMain}
                                    onChange={(newRarityIndex) => {
                                        const newMax = MAX_LVL_VALUES[newRarityIndex] ?? 60;
                                        const cappedLevel = Math.min(data.cannonLvlMain, newMax);
                                        updateField("cannonRarityMain", newRarityIndex);
                                        updateField("cannonLvlMain", cappedLevel);
                                    }}
                                />
                                <div className="flex gap-2 items-end ">
                                    <StatInput
                                        label="Main Cannon Level"
                                        unit="x"
                                        value={data.cannonLvlMain}
                                        onChange={(val) => updateField("cannonLvlMain", val)}
                                        min={0}
                                        max={moduleMax}
                                    />
                                    <span className="text-lg">x{moduleMain}</span>
                                </div>
                            </section>
                
                            <Label>Cannon Assist Main Stat Efficiency ({data.mainstatEfficiency}%)</Label>
                            <Slider
                                value={[data.mainstatEfficiency]}
                                max={100}
                                onValueChange={(val) => updateField("mainstatEfficiency", val[0])}
                                className="w-1/2"
                            />
                
                            <section className="flex gap-2">
                                <MainstatRarityPicker
                                    label="Assist Cannon Rarity"
                                    currentLevel={data.cannonRarityAssist}
                                    onChange={(newRarityIndex) => {
                                        const newMax = MAX_LVL_VALUES[newRarityIndex] ?? 60;
                                        const cappedLevel = Math.min(
                                            data.cannonLvlAssist,
                                            newMax
                                        );
                                        updateField("cannonRarityAssist", newRarityIndex);
                                        updateField("cannonLvlAssist", cappedLevel);
                                    }}
                                />
                                <div className="flex gap-2 items-end ">
                                    <StatInput
                                        label="Assist Cannon Level"
                                        unit="x"
                                        value={data.cannonLvlAssist}
                                        onChange={(val) => updateField("cannonLvlAssist", val)}
                                        min={0}
                                        max={moduleMaxAssist}
                                    />
                                    <span className="text-lg">x{(1+(moduleAssist-1)*(data.mainstatEfficiency/100)).toFixed(3)}</span>
                                </div>
                            </section>

                <div className="flex justify-between">
                    <div className="flex gap-2 items-center">
                        <p>Amplifying Strike Activation</p>

                        <Switch
                            checked={data.hasAS}
                            onCheckedChange={(v) => updateField("hasAS", v)}
                        />
                    </div>
                    {data.hasAS && <span>x5</span>}
                </div>

                <SubstatPicker
                    label="Project Funding Rarity"
                    levels={PF_STATS}
                    currentLevel={data.PFValue}
                    efficiency={100}
                    rarities={MAINSTAT_RARITIES}
                    unit=""
                    prefix="x"
                    onChange={(v) => updateField("PFValue", v)}
                />
                <div>
                    <div className="flex text-center">
                        <StatInput
                            label="End of run cash"
                            value={data.endingCash}
                            onChange={(v) => updateField("endingCash", v)}
                            min={1}
                            max={999}
                            unit=""
                        />
                        <div className="flex items-end">
                            <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                    <Button variant="outline">
                                        {data.endingCashSuffix}
                                    </Button>
                                </DropdownMenuTrigger>

                                <DropdownMenuContent className="w-56">
                                    <DropdownMenuLabel>
                                        Cash suffix
                                    </DropdownMenuLabel>
                                    <DropdownMenuSeparator />

                                    <DropdownMenuItem
                                        onClick={() =>
                                            updateField("endingCashSuffix", "M")
                                        }
                                    >
                                        M
                                    </DropdownMenuItem>

                                    <DropdownMenuItem
                                        onClick={() =>
                                            updateField("endingCashSuffix", "B")
                                        }
                                    >
                                        B
                                    </DropdownMenuItem>

                                    <DropdownMenuItem
                                        onClick={() =>
                                            updateField("endingCashSuffix", "T")
                                        }
                                    >
                                        T
                                    </DropdownMenuItem>
                                </DropdownMenuContent>
                            </DropdownMenu>
                        </div>
                    </div>
                </div>
            </section>

            <section className="space-y-4 border-b pb-4 ">
                <Label>Relics </Label>
                <div className="flex justify-between">
                    <Slider
                        value={[data.relicValue]}
                        max={DMG_RELICS_MAX}
                        min={0}
                        onValueChange={(val) =>
                            updateField("relicValue", val[0])
                        }
                        className="w-1/2"
                    />
                    <span>{data.relicValue}%</span>
                </div>
            </section>

            <section>
                <LevelPicker
                    label="Vault"
                    levels={DMG_VAULT}
                    currentLevel={data.vaultValue}
                    onChange={(val) => updateField("vaultValue", val)}
                />
            </section>
        </div>
    );
}
