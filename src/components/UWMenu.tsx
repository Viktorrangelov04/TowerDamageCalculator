import type { PlayerBuild, UWBuild } from "@/types";
import { StatInput } from "./StatInput";
import { Switch } from "./ui/switch";
import { Label } from "./ui/label";
import LevelPicker from "./LevelPicker";
import { CL_SUBS, UW_VAULT } from "@/data/constants";
import { Slider } from "./ui/slider";
import SubstatPicker from "./SubstatPicker";

interface UWMenuProps {
    data: UWBuild;
    setBuild: React.Dispatch<React.SetStateAction<PlayerBuild>>;
}

export default function UWMenu({ data, setBuild }: UWMenuProps) {
    // One helper to rule them all
    const updateField = (field: keyof UWBuild, value: any) => {
        setBuild((prev) => ({
            ...prev,
            uw: { ...prev.uw, [field]: value },
        }));
    };

    return (
        <div className="space-y-10">
            <header className="border-b pb-4">
                <h2 className="text-xl font-bold">UW Damage Sources</h2>
            </header>

            <section>
                <StatInput
                    label="CL Multiplier"
                    unit="x"
                    value={data.baseUWDamage}
                    onChange={(val) => updateField("baseUWDamage", val)}
                    min={1}
                    max={7961}
                />
                <SubstatPicker
                    label="CL Sub"
                    levels = {CL_SUBS}
                    currentLevel={data.substatValue}
                    efficiency={100}
                    onChange={(val) => updateField("substatValue", val)}
                    unit="x"
                />
            </section>
            <section className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <StatInput
                    label="Main Module Multiplier"
                    unit="x"
                    value={data.moduleMain}
                    onChange={(val) => updateField("moduleMain", val)}
                    min={1}
                    max={55}
                />
                <StatInput
                    label="Assist Module Multiplier"
                    unit="x"
                    value={data.moduleAssist}
                    onChange={(val) => updateField("moduleAssist", val)}
                    min={1}
                    max={55}
                />
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
                    <Switch
                        checked={data.hasSL}
                        onCheckedChange={(val) => updateField("hasSL", val)}
                    />
                </div>
            </section>

            <section className="space-y-2 ">
                <Label>Relic </Label>
                <div className="flex justify-between">
                    <Slider
                        value={[data.relicValue]}
                        max={35}
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
