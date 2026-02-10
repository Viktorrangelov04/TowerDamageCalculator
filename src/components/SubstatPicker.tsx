import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { Label } from "@/components/ui/label";


interface Props {
    label: string;
    levels: number[];
    currentLevel: number;
    efficiency: number;
    onChange: (level: number) => void;
    unit?: string;
}

const rarities = ["None", "Common", "Rare", "Epic", "Legendary", "Mythic", "Ancestral"];

export default function SubstatPicker({
    label,
    levels,
    currentLevel,
    efficiency,
    onChange,
    unit = "%",
}: Props) {
    return (
        <div className="space-y-3">
            <div className="flex justify-between items-center">
                <Label className="text-sm font-semibold text-gray-700">
                    {label}
                </Label>
                <span className="text-sm font-bold text-primary">
                    +{levels[currentLevel]*(efficiency/100)}
                    {unit}
                </span>
            </div>

            <ToggleGroup
                type="single"
                value={currentLevel.toString()}
                onValueChange={(val) => val && onChange(parseInt(val))}
                className="flex flex-wrap gap-1 justify-start"
            >
                {rarities.map((rarityName, index) => {
                    return (
                        <ToggleGroupItem
                            key={index}
                            value={index.toString()}
                            className="h-9 w-auto px-3 border rounded-md data-[state=on]:bg-green-300"
                        >
                            {rarityName}{" "}
                           
                        </ToggleGroupItem>
                    );
                })}
            </ToggleGroup>
        </div>
    );
}
