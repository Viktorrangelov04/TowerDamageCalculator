import { BST_PERKS, BST_SUBS, SUBSTAT_RARITIES } from "@/data/constants";
import type { BSTBuild} from "@/types";
import SubstatPicker from "../SubstatPicker";
import { Label } from "../ui/label";
import { Switch } from "../ui/switch";
import { Slider } from "../ui/slider";
import LevelPicker from "../LevelPicker";

interface BSTInputProps {
    data: BSTBuild;
    hasAssist: boolean;
    assistSubstatEfficiency: number;

    onUpdateField: (field: keyof BSTBuild, value: any) => void;
    setHasAssist: (val: boolean) => void;
    setAssistSubstatEfficiency: (val: number) => void;
}

export default function BSTInput({
    data,
    hasAssist,
    assistSubstatEfficiency,
    onUpdateField,
    setHasAssist,
    setAssistSubstatEfficiency,
}: BSTInputProps) {
    return (
        <div>
            <h1>Bounce Shot Target Sources</h1>
            <section className="py-4">
                <div className="flex justify-between">
                    <h3>Workshop</h3>
                    <span className="text-sm font-bold text-primary">8</span>
                </div>
            </section>

            <section className="space-y-4">
                <SubstatPicker
                    label="Main sub"
                    levels={BST_SUBS}
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
                            levels={BST_SUBS}
                            currentLevel={data.assistSubstatValue}
                            efficiency={assistSubstatEfficiency}
                            onChange={(val) =>
                                onUpdateField("assistSubstatValue", val)
                            }
                            rarities={SUBSTAT_RARITIES}
                            unit=""
                        />
                    </div>
                )}
            </section>

            <section>
                <LevelPicker
                    label="Bounce Shot Target Perk count"
                    levels={BST_PERKS}
                    currentLevel={data.perkValue}
                    onChange={(val) => onUpdateField("perkValue", val)}
                />
            </section>
        </div>
    );
}
