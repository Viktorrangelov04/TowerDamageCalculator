import type { DMGBuild, PlayerBuild } from "@/types";
import SubstatPicker from "./SubstatPicker";
import { ACP_STATS, DC_STATS, MAINSTAT_RARITIES } from "@/data/constants";
import { Label } from "./ui/label";
import { Switch } from "./ui/switch";
import { Slider } from "./ui/slider";

interface AdditionalDamageMenuProps {
    data: DMGBuild;
    setBuild: React.Dispatch<React.SetStateAction<PlayerBuild>>;
    hasSL: boolean;
    setHasSL: (val: boolean) => void;
}

export default function AdditinalDamageMenu({
    data,
    setBuild,
    hasSL,
    setHasSL,
}: AdditionalDamageMenuProps) {
    const updateField = (field: keyof DMGBuild, value: any) => {
        setBuild((prev) => ({
            ...prev,
            dmg: { ...prev.dmg, [field]: value },
        }));
    };
    let shockValue = 0.66
    if(data.DCValue == 0){
        shockValue = 1+DC_STATS[data.DCValue]*data.shockLabValue
    }else{
        shockValue = 1+DC_STATS[data.DCValue]*(data.shockLabValue*2)
    }



    return (
        <div className="space-y-6">
            <h1 className="border-b pb-4">Damage multipliers</h1>
 
            <section className="space-y-4">
                <p className="border-b pb-4"> Modules </p>

                <SubstatPicker
                    label="ACP Rarity"
                    levels={ACP_STATS}
                    currentLevel={data.ACPValue}
                    efficiency={100}
                    rarities={MAINSTAT_RARITIES}
                    unit=""
                    prefix="x"
                    onChange={(v) => updateField("ACPValue", v)}
                />

                <SubstatPicker
                    label="DC Rarity"
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
                    <div className="flex justify-between py-6">
                        <Slider
                            value={[data.SLValue || 1]}
                            max={43}
                            step={1.4}
                            min={8}
                            onValueChange={(v) => updateField("SLValue", v[0])}
                            className="w-1/2"
                        />
                        <Label>{data.SLValue}</Label>
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
                        <Label>{data.SLPlusValue}</Label>
                    </div>
                ) : (
                    <div className="w-full text-center p-4 border-2 border-dashed rounded-lg text-muted-foreground text-sm">
                        Unlock SL+ to configure boost
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
                        <Label>{data.ampBotValue}</Label>
                    </div>
                ) : (
                    <div className="w-full text-center p-4 border-2 border-dashed rounded-lg text-muted-foreground text-sm">
                        Unlock Amplify Bot to configure
                    </div>
                )}
            </section>
        </div>
    );
}
