import { useState } from "react";
import OverviewCard from "./OverviewCard";
import CCInput from "./crit/CCInput";
import CFInput from "./crit/CFInput";
import SCCInput from "./crit/SCCInput";
import SCMInput from "./crit/SCMInput";
import { 
    calculateTotalCrit, 
    calculateTotalCritFactor, 
    calculateTotalSuperCrit, 
    calculateTotalSuperCritMulti 
} from "@/utils/calculations";
import type { PlayerBuild } from "@/types";

interface CritMenuProps {
    build: any; 
    setBuild: React.Dispatch<React.SetStateAction<PlayerBuild>>;
}

export default function CritMenu({ build, setBuild }: CritMenuProps) {
    const [selectedSubStat, setSelectedSubStat] = useState("Critical Chance");

    const updateField = (category: keyof PlayerBuild, field: string, value: any) => {
        setBuild((prev) => ({
            ...prev,
            [category]: { 
                ...(prev[category] as object), 
                [field]: value 
            }
        }));
    };

    const setHasMastery = (val: boolean) => setBuild((p: any) => ({ ...p, hasMastery: val }));
    const setMasteryValue = (val: number) => setBuild((p: any) => ({ ...p, masteryValue: val }));
    const setHasAssist = (val: boolean) => setBuild((p: any) => ({ ...p, hasAssist: val }));
    const setAssistSubstatEfficiency = (val: number) => setBuild((p: any) => ({ ...p, assistSubstatEfficiency: val }));

    const totals = {
        cc: calculateTotalCrit({ ...build.cc, hasMastery: build.hasMastery, masteryValue: build.masteryValue, hasAssist: build.hasAssist, efficiency: build.assistSubstatEfficiency }),
        cf: calculateTotalCritFactor({ ...build.cf, hasAssist: build.hasAssist, efficiency: build.assistSubstatEfficiency }),
        scc: calculateTotalSuperCrit({ ...build.scc, hasMastery: build.hasMastery, masteryValue: build.masteryValue, hasAssist: build.hasAssist, efficiency: build.assistSubstatEfficiency }),
        scm: calculateTotalSuperCritMulti({ ...build.scm, hasMastery: build.hasMastery,masteryValue: build.masteryValue,  hasAssist: build.hasAssist, efficiency: build.assistSubstatEfficiency }),
    };

    return (
        <div className="space-y-6">
            <h2 className="text-xl font-bold">Crit Configuration</h2>

            <div className="grid grid-cols-2 gap-4">
                <OverviewCard
                    name="Critical Chance"
                    value={`${totals.cc.toFixed(2)}%`}
                    active={selectedSubStat === "Critical Chance"}
                    onClick={() => setSelectedSubStat("Critical Chance")}
                />
                <OverviewCard
                    name="Critical Factor"
                    value={`${totals.cf.toFixed(2)}x`}
                    active={selectedSubStat === "Critical Factor"}
                    onClick={() => setSelectedSubStat("Critical Factor")}
                />
                <OverviewCard
                    name="Super Crit Chance"
                    value={`${totals.scc.toFixed(2)}%`}
                    active={selectedSubStat === "Super Crit Chance"}
                    onClick={() => setSelectedSubStat("Super Crit Chance")}
                />
                <OverviewCard
                    name="Super Crit Mult"
                    value={`${totals.scm.toFixed(2)}x`}
                    active={selectedSubStat === "Super Crit Mult"}
                    onClick={() => setSelectedSubStat("Super Crit Mult")}
                />
            </div>

            <div className="rounded-xl border p-6 shadow-sm min-h-[300px]">
                {selectedSubStat === "Critical Chance" && (
                    <CCInput
                        data={build.cc}
                        onUpdateField={(f, v) => updateField("cc", f, v)}
                        hasMastery={build.hasMastery}
                        setHasMastery={setHasMastery}
                        masteryValue={build.masteryValue}
                        setMasteryValue={setMasteryValue}
                        hasAssist={build.hasAssist}
                        setHasAssist={setHasAssist}
                        assistSubstatEfficiency={build.assistSubstatEfficiency}
                        setAssistSubstatEfficiency={setAssistSubstatEfficiency}
                    />
                )}

                {selectedSubStat === "Critical Factor" && (
                    <CFInput
                        data={build.cf}
                        onUpdateField={(f, v) => updateField("cf", f, v)}
                        hasAssist={build.hasAssist}
                        setHasAssist={setHasAssist}
                        assistSubstatEfficiency={build.assistSubstatEfficiency}
                        setAssistSubstatEfficiency={setAssistSubstatEfficiency}
                    />
                )}

                {selectedSubStat === "Super Crit Chance" && (
                    <SCCInput
                        data={build.scc}
                        onUpdateField={(f, v) => updateField("scc", f, v)}
                        hasMastery={build.hasMastery}
                        setHasMastery={setHasMastery}
                        masteryValue={build.masteryValue}
                        setMasteryValue={setMasteryValue}
                        hasAssist={build.hasAssist}
                        setHasAssist={setHasAssist}
                        assistSubstatEfficiency={build.assistSubstatEfficiency}
                        setAssistSubstatEfficiency={setAssistSubstatEfficiency}
                    />
                )}

                {selectedSubStat === "Super Crit Mult" && (
                    <SCMInput
                        data={build.scm}
                        onUpdateField={(f, v) => updateField("scm", f, v)}
                        hasMastery={build.hasMastery}
                        setHasMastery={setHasMastery}
                        masteryValue={build.masteryValue}
                        setMasteryValue={setMasteryValue}
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