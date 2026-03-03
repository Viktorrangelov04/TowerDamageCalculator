import type { DMGBuild, PlayerBuild } from "@/types";
import { Slider } from "./ui/slider";
import LevelPicker from "./LevelPicker";
import {
    DAMAGE_CARD_STATS,
    DAMAGE_MASTERY_STATS,
    DEMON_MODE_MASTERY_STATS,
    DMG_VAULT,
    MAINSTAT_RARITIES,
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

interface BaseDamageProps {
    data: DMGBuild;
    setBuild: React.Dispatch<React.SetStateAction<PlayerBuild>>;
}
export default function BaseDamageMenu({ data, setBuild }: BaseDamageProps) {
    const updateField = (field: keyof DMGBuild, value: any) => {
        setBuild((prev) => ({
            ...prev,
            dmg: { ...prev.dmg, [field]: value },
        }));
    };
    return (
        <div className="space-y-6">
            <h1 className="border-b pb-4">Base damage sources</h1>
           
            <section className="space-y-4 border-b py-4">
                <div className="flex justify-between">
                    <p>Workshop Damage</p>
                    <p>71.11M</p>
                </div>
                <div className="flex justify-between">
                    <p >Workshop Enhancement</p>
                    <span >x{data.workshopEnhancementValue}</span>
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
                        max={2.98}
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
                <section className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <StatInput
                        label="Main Module Multiplier"
                        unit="x"
                        value={data.moduleMain}
                        onChange={(val) => updateField("moduleMain", val)}
                        min={1}
                        max={43.288}
                    />
                    <StatInput
                        label="Assist Module Multiplier"
                        unit="x"
                        value={data.moduleAssist}
                        onChange={(val) => updateField("moduleAssist", val)}
                        min={1}
                        max={43.288}
                    />
                </section>

                <div className="flex justify-between">
                    <div className="flex gap-2 items-center">
                        <p>AS procc</p>

                        <Switch
                            checked={data.hasAS}
                            onCheckedChange={(v) => updateField("hasAS", v)}
                        />
                    </div>
                    {data.hasAS && <span>x5</span>}
                </div>

                <SubstatPicker
                    label="PF Rarity"
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
                        max={97}
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
