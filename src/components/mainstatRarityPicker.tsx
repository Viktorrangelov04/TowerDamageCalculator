import { MAINSTAT_RARITIES2 } from "@/data/constants";
import { Label } from "./ui/label";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "./ui/select";

interface mainstatRarityPicerProps {
    label: string;
    currentLevel: number;
    onChange: (level: number) => void;
}

export default function MainstatRarityPicker({
    label,
    currentLevel,
    onChange, 
}: mainstatRarityPicerProps) {
    return (
        <div>
            <div className="flex justify-between items-center mb-2">
                <Label className="text-sm font-semibold">{label}</Label>
               
            </div>

            <Select
                value={currentLevel.toString()}
                onValueChange={(value) => onChange(parseInt(value))}
            >
                <SelectTrigger className="w-[180px]">
                    <SelectValue />
                </SelectTrigger>
                <SelectContent>
                    {MAINSTAT_RARITIES2.map((level, index) => (
                        <SelectItem key={level} value={index.toString()}>
                            {level.charAt(0).toUpperCase() + level.slice(1)}
                        </SelectItem>
                    ))}
                </SelectContent>
            </Select>
        </div>
    );
}
