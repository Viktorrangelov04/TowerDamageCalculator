import { MSC_SUBS, MSC_VAULT, SUBSTAT_RARITIES } from "@/data/constants";
import type { MSCBuild } from "@/types";
import SubstatPicker from "../SubstatPicker";
import { Label } from "../ui/label";
import { Switch } from "../ui/switch";
import { Slider } from "../ui/slider";
import LevelPicker from "../LevelPicker";

interface MSCInputProps {
    data: MSCBuild;
    hasAssist: boolean;
    assistSubstatEfficiency: number;

    onUpdateField: (field: keyof MSCBuild, value: any) => void;
    setHasAssist: (val: boolean) => void;
    setAssistSubstatEfficiency: (val: number) => void;
}

export default function MSCInput({
    data,
    hasAssist,
    assistSubstatEfficiency,
    onUpdateField,
    setHasAssist,
    setAssistSubstatEfficiency,
}: MSCInputProps) {
    return (
        <div>
            <h1>Multishot Chance Sources</h1>
            <section className="py-4">
                <div className="flex justify-between">
                    <h3>Workshop</h3>
                    <span className="text-sm font-bold text-primary">49.5%</span>
                </div>
            </section>

            <section className="space-y-4">
                <SubstatPicker
                    label="Main sub"
                    levels={MSC_SUBS}
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
                            levels={MSC_SUBS}
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

            <section>
                <LevelPicker
                    label="Vault"
                    levels={MSC_VAULT}
                    currentLevel={data.vaultValue}
                    onChange={(val) => onUpdateField("vaultValue", val)}
                />
            </section>
        </div>
    );
}
