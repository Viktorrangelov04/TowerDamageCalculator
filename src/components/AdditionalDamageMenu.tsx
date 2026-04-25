import type { DMGBuild, PlayerBuild } from "@/types";
import SubstatPicker from "./SubstatPicker";
import {
    ACP_STATS,
    DC_STATS,
    MAINSTAT_RARITIES,
    SL_SUBS,
    SUBSTAT_RARITIES,
    UW_CRIT_MASTERY_STATS,
    UW_CRIT_STATS,
    UW_VAULT,
} from "@/data/constants";
import { Label } from "./ui/label";
import { Switch } from "./ui/switch";
import { Slider } from "./ui/slider";
import LevelPicker from "./LevelPicker";

interface AdditionalDamageMenuProps {
    data: DMGBuild;
    setBuild: React.Dispatch<React.SetStateAction<PlayerBuild>>;
    hasSL: boolean;
    setHasSL: (val: boolean) => void;
    coreSubstatEfficiency: number;
    setCoreSubstatEfficiency: (val: number) => void;
    UWRelicValue: number;
    hasST: boolean;
    STLabValue: number;
    UWVaultValue: number;
    damageMeter: number;
    UWDNBonus: number;
}

export default function AdditinalDamageMenu({
    data,
    setBuild,
    hasSL,
    setHasSL,
    coreSubstatEfficiency,
    setCoreSubstatEfficiency,
    UWRelicValue,
    hasST,
    STLabValue,
    UWVaultValue,
    damageMeter,
    UWDNBonus,
}: AdditionalDamageMenuProps) {
    const updateField = (field: keyof DMGBuild, value: any) => {
        setBuild((prev) => ({
            ...prev,
            dmg: { ...prev.dmg, [field]: value },
        }));
    };
    let shockValue = 0.66;
    if (data.DCValue == 0) {
        shockValue = 1 + DC_STATS[data.DCValue] * data.shockLabValue;
    } else {
        shockValue = 1 + DC_STATS[data.DCValue] * (data.shockLabValue * 2);
    }

    const SLPlusValue = data.hasScout
        ? 1 +
          (damageMeter - 1) * data.SLPlusValue * data.range * data.scoutValue
        : 1 + (damageMeter - 1) * data.SLPlusValue * data.range;

    const SLValue =
        hasST && data.hasSLPerk
            ? (data.SLValue +
                  SL_SUBS[data.SLSubstatValue] +
                  (SL_SUBS[data.SLAssistSubstatValue] * coreSubstatEfficiency) /
                      100) *
              0.35 *
              5 *
              STLabValue *
              (1 + UWRelicValue / 100) *
              (1 + UW_VAULT[UWVaultValue] / 100) *
              1.5 *
              UWDNBonus
            : hasST
            ? (data.SLValue +
                  SL_SUBS[data.SLSubstatValue] +
                  (SL_SUBS[data.SLAssistSubstatValue] * coreSubstatEfficiency) /
                      100) *
              0.35 *
              5 *
              STLabValue *
              (1 + UWRelicValue / 100) *
              (1 + UW_VAULT[UWVaultValue] / 100) *
              UWDNBonus
            : data.hasSLPerk
            ? (data.SLValue +
                  SL_SUBS[data.SLSubstatValue] +
                  (SL_SUBS[data.SLAssistSubstatValue] * coreSubstatEfficiency) /
                      100) *
              (1 + UWRelicValue / 100) *
              (1 + UW_VAULT[UWVaultValue] / 100) *
              1.5 *
              UWDNBonus
            : (data.SLValue +
                  SL_SUBS[data.SLSubstatValue] +
                  (SL_SUBS[data.SLAssistSubstatValue] * coreSubstatEfficiency) /
                      100) *
              (1 + UWRelicValue / 100) *
              (1 + UW_VAULT[UWVaultValue] / 100) *
              UWDNBonus;

    return (
        <div className="space-y-6">
            <h1 className="border-b pb-4">Damage multipliers</h1>

            <section className="space-y-4">
                <p className="border-b pb-4"> Modules </p>

                <SubstatPicker
                    label="Anti-Cube Portal Rarity"
                    levels={ACP_STATS}
                    currentLevel={data.ACPValue}
                    efficiency={100}
                    rarities={MAINSTAT_RARITIES}
                    unit=""
                    prefix="x"
                    onChange={(v) => updateField("ACPValue", v)}
                />

                <SubstatPicker
                    label="Dimension Core Rarity"
                    levels={DC_STATS}
                    currentLevel={data.DCValue}
                    efficiency={100}
                    rarities={MAINSTAT_RARITIES}
                    unit=""
                    prefix="x"
                    onChange={(v) => updateField("DCValue", v)}
                />
                <Label>Shock Multiplier lab</Label>
                <div className="flex justify-between">
                    <Slider
                        value={[data.shockLabValue || 0.01]}
                        max={0.66}
                        step={0.04}
                        min={0.1}
                        onValueChange={(v) =>
                            updateField("shockLabValue", v[0])
                        }
                        className="w-1/2"
                    />
                    <Label>{data.shockLabValue}</Label>
                </div>
                <div className="flex justify-between">
                    <Label>Shock damage boost</Label>
                    <span>{shockValue.toFixed(2)}</span>
                </div>
            </section>

            <section className="space-y-4">
                <p className="border-y py-4">Ultimate Weapons</p>

                <div className="flex items-center gap-2 pt-4">
                    <div className="space-y-0.5">
                        <Label className="text-base font-semibold">
                            Spotlight Unlocked
                        </Label>
                    </div>
                    <Switch checked={hasSL} onCheckedChange={setHasSL} />
                </div>

                {hasSL ? (
                    <div className="space-y-4">
                        <div className="flex justify-between py-6">
                            <Slider
                                value={[data.SLValue || 1]}
                                max={43}
                                step={1.4}
                                min={8}
                                onValueChange={(v) =>
                                    updateField("SLValue", v[0])
                                }
                                className="w-1/2"
                            />
                            <Label>
                                x{data.SLValue}/x
                                {SLValue.toFixed()}
                            </Label>
                        </div>
                        <div className="flex items-center gap-2">
                            <Label className="text-sm font-semibold">
                                Spotlight Perk
                            </Label>
                            <Switch
                                checked={data.hasSLPerk}
                                onCheckedChange={(val) =>
                                    updateField("hasSLPerk", val)
                                }
                            />
                        </div>
                        <SubstatPicker
                            label="Main Spotlight Bonus Substat"
                            levels={SL_SUBS}
                            currentLevel={data.SLSubstatValue}
                            efficiency={100}
                            onChange={(val) =>
                                updateField("SLSubstatValue", val)
                            }
                            unit="x"
                            rarities={SUBSTAT_RARITIES}
                        />
                        <Label>
                            Core Assist Substat Stat Efficiency (
                            {coreSubstatEfficiency}
                            %)
                        </Label>
                        <Slider
                            value={[coreSubstatEfficiency]}
                            max={100}
                            onValueChange={(val) =>
                                setCoreSubstatEfficiency(val[0])
                            }
                            className="w-1/2"
                        />

                        <SubstatPicker
                            label="Assist Spotlight Bonus Substat"
                            levels={SL_SUBS}
                            currentLevel={data.SLAssistSubstatValue}
                            efficiency={coreSubstatEfficiency}
                            onChange={(val) =>
                                updateField("SLAssistSubstatValue", val)
                            }
                            unit="x"
                            rarities={SUBSTAT_RARITIES}
                        />
                    </div>
                ) : (
                    <div className="w-full text-center p-4 border-2 border-dashed rounded-lg text-muted-foreground text-sm">
                        Unlock SL to configure boost
                    </div>
                )}

                <div className="flex items-center gap-2 pt-4">
                    <div className="space-y-0.5">
                        <Label className="text-base font-semibold">
                            Spotlight+ Unlocked
                        </Label>
                    </div>
                    <Switch
                        checked={data.hasSLPlus}
                        onCheckedChange={(v) => updateField("hasSLPlus", v)}
                    />
                </div>

                {data.hasSLPlus ? (
                    <div className="flex justify-between py-5">
                        <Slider
                            value={[data.SLPlusValue || 0.01]}
                            max={0.15}
                            step={0.01}
                            min={0.01}
                            onValueChange={(v) =>
                                updateField("SLPlusValue", v[0])
                            }
                            className="w-1/2"
                        />
                        <Label>
                            x{data.SLPlusValue}/x{SLPlusValue.toFixed(2)}
                        </Label>
                    </div>
                ) : (
                    <div className="w-full text-center p-4 border-2 border-dashed rounded-lg text-muted-foreground text-sm">
                        Unlock SL+ to configure boost
                    </div>
                )}
            </section>

            <section className="space-y-4">
                <LevelPicker
                    label="Ultimate Crit Card Level"
                    levels={UW_CRIT_STATS}
                    currentLevel={data.UWCritValue}
                    onChange={(val) => updateField("UWCritValue", val)}
                />

                <div className="flex items-center gap-2">
                    <Label className="text-sm font-semibold">
                        Ultimate Crit Mastery Unlocked?
                    </Label>
                    <Switch
                        checked={data.hasUWCritMastery}
                        onCheckedChange={(val) =>
                            updateField("hasUWCritMastery", val)
                        }
                    />
                </div>

                {data.hasUWCritMastery ? (
                    <LevelPicker
                        label="Ultimate Crit Mastery Level"
                        levels={UW_CRIT_MASTERY_STATS}
                        currentLevel={data.UWCritMasteryValue}
                        onChange={(val) =>
                            updateField("UWCritMasteryValue", val)
                        }
                    />
                ) : (
                    <div className="w-full text-center p-6 border-2 border-dashed rounded-lg text-muted-foreground text-sm">
                        Enable Mastery to configure levels
                    </div>
                )}
            </section>

            <section className="space-y-4">
                <p className="border-y py-4">Bots</p>
                <div className="flex items-center gap-2 pt-4">
                    <div className="space-y-0.5">
                        <Label className="text-base font-semibold">
                            Amplify Bot Unlocked
                        </Label>
                    </div>
                    <Switch
                        checked={data.hasAmpBot}
                        onCheckedChange={(v) => updateField("hasAmpBot", v)}
                    />
                </div>
                {data.hasAmpBot ? (
                    <div>
                        <div className="flex justify-between py-4">
                            <Slider
                                value={[data.ampBotValue]}
                                max={15.5}
                                step={0.4}
                                min={3.5}
                                onValueChange={(v) =>
                                    updateField("ampBotValue", v[0])
                                }
                                className="w-1/2"
                            />
                            <Label>x{data.ampBotValue}</Label>
                        </div>
                        <div className="flex items-center gap-2 pt-4">
                            <div className="space-y-0.5">
                                <Label className="text-base font-semibold">
                                    Amplify Bot+ unlocked
                                </Label>
                            </div>
                            <Switch
                                checked={data.hasAmpBotPlus}
                                onCheckedChange={(v) =>
                                    updateField("hasAmpBotPlus", v)
                                }
                            />
                        </div>
                        {data.hasAmpBotPlus ? (
                            <div className="flex justify-between py-4">
                                <Slider
                                    value={[data.AmpBotPlusValue]}
                                    max={12}
                                    step={1}
                                    min={3}
                                    onValueChange={(v) =>
                                        updateField("AmpBotPlusValue", v[0])
                                    }
                                    className="w-1/2"
                                />
                                <Label>x{data.AmpBotPlusValue}</Label>
                            </div>
                        ) : (
                            <div className="w-full text-center p-4 border-2 border-dashed rounded-lg text-muted-foreground text-sm">
                                Unlock Bot Bot Plus to configure
                            </div>
                        )}
                    </div>
                ) : (
                    <div className="w-full text-center p-4 border-2 border-dashed rounded-lg text-muted-foreground text-sm">
                        Unlock Amplify Bot to configure
                    </div>
                )}

                <div className="flex items-center gap-2 pt-4">
                    <div className="space-y-0.5">
                        <Label className="text-base font-semibold">
                            Singularity Harness Flame Bot Hit
                        </Label>
                    </div>
                    <Switch
                        checked={data.SHProcc}
                        onCheckedChange={(v) => updateField("SHProcc", v)}
                    />
                </div>

                <div className="flex items-center gap-2 pt-4">
                    <div className="space-y-0.5">
                        <Label className="text-base font-semibold">
                            Flame Bot Plus Unlocked
                        </Label>
                    </div>
                    <Switch
                        checked={data.hasFlameBot}
                        onCheckedChange={(v) => updateField("hasFlameBot", v)}
                    />
                </div>
                {data.hasFlameBot ? (
                    <div className="flex justify-between py-4">
                        <Slider
                            value={[data.flameBotPlusValue]}
                            max={3.5}
                            step={0.1}
                            min={1.5}
                            onValueChange={(v) =>
                                updateField("flameBotPlusValue", v[0])
                            }
                            className="w-1/2"
                        />
                        <Label>x{data.flameBotPlusValue}</Label>
                    </div>
                ) : (
                    <div className="w-full text-center p-4 border-2 border-dashed rounded-lg text-muted-foreground text-sm">
                        Unlock flame bot+ to configure
                    </div>
                )}

                <div className="flex items-center gap-2 pt-4">
                    <div className="space-y-0.5">
                        <Label className="text-base font-semibold">
                            Bot Bot unlocked
                        </Label>
                    </div>
                    <Switch
                        checked={data.hasBotBot}
                        onCheckedChange={(v) => updateField("hasBotBot", v)}
                    />
                </div>
                {data.hasBotBot ? (
                    <div>
                        <div className="flex justify-between py-4">
                            <Slider
                                value={[data.botBotValue]}
                                max={2}
                                step={0.05}
                                min={1.05}
                                onValueChange={(v) =>
                                    updateField("botBotValue", v[0])
                                }
                                className="w-1/2"
                            />
                            <Label>x{data.botBotValue}</Label>
                        </div>

                        <div className="flex items-center gap-2 pt-4">
                            <div className="space-y-0.5">
                                <Label className="text-base font-semibold">
                                    Bot Bot+ unlocked
                                </Label>
                            </div>
                            <Switch
                                checked={data.hasBotBotPlus}
                                onCheckedChange={(v) =>
                                    updateField("hasBotBotPlus", v)
                                }
                            />
                        </div>
                        {data.hasBotBotPlus ? (
                            <div className="flex justify-between py-4">
                                <Slider
                                    value={[data.botBotPlusValue]}
                                    max={2.25}
                                    step={0.05}
                                    min={1.25}
                                    onValueChange={(v) =>
                                        updateField("botBotPlusValue", v[0])
                                    }
                                    className="w-1/2"
                                />
                                <Label>x{data.botBotPlusValue}</Label>
                            </div>
                        ) : (
                            <div className="w-full text-center p-4 border-2 border-dashed rounded-lg text-muted-foreground text-sm">
                                Unlock Bot Bot Plus to configure
                            </div>
                        )}
                    </div>
                ) : (
                    <div className="w-full text-center p-4 border-2 border-dashed rounded-lg text-muted-foreground text-sm">
                        Unlock Bot Bot to configure
                    </div>
                )}
            </section>
        </div>
    );
}
