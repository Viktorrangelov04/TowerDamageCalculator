import { useEffect, useState } from "react";
import OverviewCard from "./OverviewCard";
import CCInput from "./crit/CCInput";
import CFInput from "./crit/CFInput";
import SCCInput from "./crit/SCCInput";
import SCMInput from "./crit/SCMInput";

interface CritMenuProps {
    onUpdate: (value: number) => void;
}

export default function CritMenu({ onUpdate }: CritMenuProps) {
    const [selectedSubStat, setSelectedSubStat] = useState("CC");
    const [hasMastery, setHasMastery] = useState(false);
    const [mastLvl, setMastLvl] = useState(0);
    const [hasAssist, setHasAssist] = useState(false);
    const [assistSubstatEfficiency, setAssistSubstatEfficiency] = useState(0);
    const [totals, setTotals] = useState({
        cc: 0,
        cf: 0,
        scc: 0,
        scm: 0,
    });

    const critMultiplier =
        (1 + (totals.cc / 100) * totals.cf) *
        (1 + (totals.scc / 100) * (totals.cc / 100) * totals.scm);

    useEffect(() => {
            onUpdate(critMultiplier);
        }, [critMultiplier]);
            
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

            <div className="bg-white rounded-xl border p-6 shadow-sm min-h-[300px]">
                {!selectedSubStat && (
                    <p className="text-center text-muted-foreground pt-10">
                        Select a category above to start calculating.
                    </p>
                )}

                {selectedSubStat === "Critical Chance" && (
                    <CCInput
                        hasMastery={hasMastery}
                        setHasMastery={setHasMastery}
                        mastLvl={mastLvl}
                        setMastLvl={setMastLvl}
                        hasAssist={hasAssist}
                        setHasAssist={setHasAssist}
                        assistSubstatEfficiency={assistSubstatEfficiency}
                        setAssistSubstatEfficiency={setAssistSubstatEfficiency}
                        onUpdate={(val) => setTotals({ ...totals, cc: val })}
                    />
                )}

                {selectedSubStat === "Critical Factor" && (
                    <CFInput
                        hasAssist={hasAssist}
                        setHasAssist={setHasAssist}
                        assistSubstatEfficiency={assistSubstatEfficiency}
                        setAssistSubstatEfficiency={setAssistSubstatEfficiency}
                        onUpdate={(val) => setTotals({ ...totals, cf: val })}
                    />
                )}
                {selectedSubStat === "Super Crit Chance" && (
                    <SCCInput
                        hasMastery={hasMastery}
                        setHasMastery={setHasMastery}
                        mastLvl={mastLvl}
                        setMastLvl={setMastLvl}
                        hasAssist={hasAssist}
                        setHasAssist={setHasAssist}
                        assistSubstatEfficiency={assistSubstatEfficiency}
                        setAssistSubstatEfficiency={setAssistSubstatEfficiency}
                        onUpdate={(val) => setTotals({ ...totals, scc: val })}
                    />
                )}
                {selectedSubStat === "Super Crit Mult" && (
                    <SCMInput
                        hasMastery={hasMastery}
                        setHasMastery={setHasMastery}
                        mastLvl={mastLvl}
                        setMastLvl={setMastLvl}
                        hasAssist={hasAssist}
                        setHasAssist={setHasAssist}
                        assistSubstatEfficiency={assistSubstatEfficiency}
                        setAssistSubstatEfficiency={setAssistSubstatEfficiency}
                        onUpdate={(val) => setTotals({ ...totals, scm: val })}
                    />
                )}
            </div>
        </div>
    );
}
