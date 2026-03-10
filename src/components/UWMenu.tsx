import type { PlayerBuild, UWBuild } from "@/types";
import { StatInput } from "./StatInput";
import { Switch } from "./ui/switch";
import { Label } from "./ui/label";
import LevelPicker from "./LevelPicker";
import {
    CL_DAMAGE,
    CL_SUBS,
    MAX_LVL_VALUES,
    SUBSTAT_RARITIES,
    UW_RELICS_MAX,
    UW_VAULT,
} from "@/data/constants";
import { Slider } from "./ui/slider";
import SubstatPicker from "./SubstatPicker";
import MainstatRarityPicker from "./mainstatRarityPicker";
import * as Stats from "@/data/moduleMainStats";

interface UWMenuProps {
    data: UWBuild;
    setBuild: React.Dispatch<React.SetStateAction<PlayerBuild>>;
    hasSL: boolean;
    setHasSL: (val: boolean) => void;
}

export const RARITY_DATA_MAP: Record<number, number[]> = {
    0: Stats.CORE_EPIC_LVLS,
    1: Stats.CORE_LEGENDARY_LVLS,
    2: Stats.CORE_MYTHICPLUS_LVLS,
    3: Stats.CORE_ANC_LVLS,
    4: Stats.CORE_1STAR_LVLS,
    5: Stats.CORE_2STAR_LVLS,
    6: Stats.CORE_3STAR_LVLS,
    7: Stats.CORE_4STAR_LVLS,
    8: Stats.CORE_5STAR_LVLS,
};

export default function UWMenu({
    data,
    setBuild,
    hasSL,
    setHasSL,
}: UWMenuProps) {
    const updateField = (field: keyof UWBuild, value: any) => {
        setBuild((prev) => ({
            ...prev,
            uw: { ...prev.uw, [field]: value },
        }));
    };

    const moduleMax = MAX_LVL_VALUES[data.coreRarityMain] ?? 60;

    const currentRarityArray = RARITY_DATA_MAP[data.coreRarityMain] || [];
    const moduleMain = currentRarityArray[data.coreLvlMain] ?? 0;

    const moduleMaxAssist = MAX_LVL_VALUES[data.coreRarityAssist] ?? 60;

    const currentRarityAssistArray =
        RARITY_DATA_MAP[data.coreRarityAssist] || [];
    const moduleAssist = currentRarityAssistArray[data.coreLvlAssist] ?? 0;

    return (
        <div className="space-y-10">
            <header className="border-b pb-4">
                <h2 className="text-xl font-bold">UW Damage Sources</h2>
            </header>

            <section className="space-y-2">
                <div className="flex justify-between items-end">
                    <StatInput
                        label="Chain Lightning Level"
                        unit="x"
                        value={data.CLLvl}
                        onChange={(val) => updateField("CLLvl", val)}
                        min={0}
                        max={31}
                    />
                    <span>x{CL_DAMAGE[data.CLLvl]}</span>
                </div>

                
                <SubstatPicker
                    label="Chain Lightning Damage Sub"
                    levels={CL_SUBS}
                    currentLevel={data.substatValue}
                    efficiency={100}
                    onChange={(val) => updateField("substatValue", val)}
                    unit="x"
                    rarities={SUBSTAT_RARITIES}
                />
            </section>

            <section className="flex gap-2">
                <MainstatRarityPicker
                    label="Main Core Rarity"
                    currentLevel={data.coreRarityMain}
                    onChange={(newRarityIndex) => {
                        const newMax = MAX_LVL_VALUES[newRarityIndex] ?? 60;
                        const cappedLevel = Math.min(data.coreLvlMain, newMax);
                        updateField("coreRarityMain", newRarityIndex);
                        updateField("coreLvlMain", cappedLevel);
                    }}
                />
                <div className="flex gap-2 items-end ">
                    <StatInput
                        label="Main Core Level"
                        unit="x"
                        value={data.coreLvlMain}
                        onChange={(val) => updateField("coreLvlMain", val)}
                        min={0}
                        max={moduleMax}
                    />
                    <span className="text-lg">x{moduleMain}</span>
                </div>
            </section>

            <Label>
                Assist Main Stat Efficiency ({data.mainstatEfficiency}%)
            </Label>
            <Slider
                value={[data.mainstatEfficiency]}
                max={100}
                onValueChange={(val) => updateField("mainstatEfficiency", val)}
                className="w-1/2"
            />

            <section className="flex gap-2">
                <MainstatRarityPicker
                    label="Assist Core Rarity"
                    currentLevel={data.coreRarityAssist}
                    onChange={(newRarityIndex) => {
                        const newMax = MAX_LVL_VALUES[newRarityIndex] ?? 60;
                        const cappedLevel = Math.min(
                            data.coreLvlAssist,
                            newMax
                        );
                        updateField("coreRarityAssist", newRarityIndex);
                        updateField("coreLvlAssist", cappedLevel);
                    }}
                />
                <div className="flex gap-2 items-end ">
                    <StatInput
                        label="Assist Core Level"
                        unit="x"
                        value={data.coreLvlAssist}
                        onChange={(val) => updateField("coreLvlAssist", val)}
                        min={0}
                        max={moduleMaxAssist}
                    />
                    <span className="text-lg">
                        x
                        {Math.max(
                            moduleAssist * (data.mainstatEfficiency / 100),
                            1
                        ).toFixed(2)}
                    </span>
                </div>
            </section>

            <section className="space-y-6 p-6 rounded-xl border border-dashed">
                <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                        <Label className="text-base font-semibold">
                            Super Tower Mastery Unlocked
                        </Label>
                    </div>
                    <Switch
                        checked={data.hasMastery}
                        onCheckedChange={(val) =>
                            updateField("hasMastery", val)
                        }
                    />
                </div>

                <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                        <Label className="text-base font-semibold">
                            Super Tower Lab Level
                        </Label>
                    </div>
                    <Slider
                        value={[data.STLabValue]}
                        max={1.9}
                        step={0.03}
                        min={1}
                        onValueChange={(val) =>
                            updateField("STLabValue", val[0])
                        }
                        className="w-1/2"
                    />
                    <span>x{data.STLabValue}</span>
                </div>

                <div className="flex items-center justify-between border-t pt-4">
                    <div className="space-y-0.5">
                        <Label className="text-base font-semibold">
                            Spotlight Unlocked
                        </Label>
                    </div>
                    <Switch checked={hasSL} onCheckedChange={setHasSL} />
                </div>
            </section>

            <section className="space-y-2 ">
                <Label>Relic </Label>
                <div className="flex justify-between">
                    <Slider
                        value={[data.relicValue]}
                        max={UW_RELICS_MAX}
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
                    levels={UW_VAULT}
                    currentLevel={data.vaultValue}
                    onChange={(val) => updateField("vaultValue", val)}
                />
            </section>
        </div>
    );
}
