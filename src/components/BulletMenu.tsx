import type { PlayerBuild } from "@/types";
import { useState } from "react";
import OverviewCard from "./OverviewCard";
import ASInput from "./bullets/ASInput";
import { CalculateTotalAS, CalculateTotalBSC } from "@/utils/calculations";
import BSCInput from "./bullets/BSCInput";

interface BulletMenuProps {
    build: any;
    setBuild: React.Dispatch<React.SetStateAction<PlayerBuild>>;
}

export default function RangeMenu({ build, setBuild }: BulletMenuProps) {
    const [selectedSubStat, setSelectedSubStat] = useState("Attack Speed");

    const updateField = (
        category: keyof PlayerBuild,
        field: string,
        value: any
    ) => {
        setBuild((prev) => ({
            ...prev,
            [category]: {
                ...(prev[category] as object),
                [field]: value,
            },
        }));
    };

    const setHasAssist = (val: boolean) =>
        setBuild((p: any) => ({ ...p, hasAssist: val }));
    const setAssistSubstatEfficiency = (val: number) =>
        setBuild((p: any) => ({ ...p, assistSubstatEfficiency: val }));

    const totals = {
        as: CalculateTotalAS({...build.as, hasAssist: build.hasAssist, efficiency: build.assistSubstatEfficiency}),
        bsc: CalculateTotalBSC({...build.bsc, hasAssist: build.hasAssist, efficiency: build.assistSubstatEfficiency})
    }

    return (
        <div>
            <h1>Bullet Configuration</h1>
            <div className="grid grid-cols-2 gap-4">
                <OverviewCard
                    name="Attack Speed"
                    value={totals.as.toFixed(2)}
                    active={selectedSubStat === "Attack Speed"}
                    onClick={() => setSelectedSubStat("Attack Speed")}
                />

                <OverviewCard
                    name="Bounce Shot Chance"
                    value={`${totals.bsc.toFixed(2)}%`}
                    active={selectedSubStat === "BSC"}
                    onClick={() => setSelectedSubStat("BSC")}
                />

                <OverviewCard
                    name="Multishot Chance"
                    value={"49.5%"}
                    active={selectedSubStat === "MSC"}
                    onClick={() => setSelectedSubStat("MSC")}
                />

                <OverviewCard
                    name="Multishot Targets"
                    value={"13"}
                    active={selectedSubStat === "MST"}
                    onClick={() => setSelectedSubStat("MST")}
                />
            </div>

            <div className="rounded-xl border p-6 shadow-sm min-h-[300px]">
                {selectedSubStat === "Attack Speed" && (
                    <ASInput
                        data={build.as}
                        onUpdateField={(f: string, v: any) => updateField("as", f, v)}
                        hasAssist={build.hasAssist}
                        setHasAssist={setHasAssist}
                        assistSubstatEfficiency={build.assistSubstatEfficiency}
                        setAssistSubstatEfficiency={setAssistSubstatEfficiency}
                    />
                )}

                {selectedSubStat === "BSC" && (
                    <BSCInput
                        data={build.bsc}
                        onUpdateField={(f: string, v: any) => updateField("bsc", f, v)}
                        hasAssist={build.hasAssist}
                        setHasAssist={setHasAssist}
                        assistSubstatEfficiency={build.assistSubstatEfficiency}
                        setAssistSubstatEfficiency={setAssistSubstatEfficiency}
                    />
                )}
            </div>

        </div>
    );
}


