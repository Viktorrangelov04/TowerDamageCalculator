import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { Label } from "@/components/ui/label";

interface LevelPickerProps {
  label: string;
  levels: number[];      
  currentLevel: number;
  onChange: (level: number) => void;
  unit?: string;
}

export default function CardLevelPicker({ label, levels, currentLevel, onChange, unit = "%" }: LevelPickerProps) {
  return (
    <div className="space-y-3">
      <div className="flex justify-between items-center">
        <Label className="text-sm font-semibold text-gray-700">{label}</Label>
        <span className="text-sm font-bold text-primary">
          +{levels[currentLevel]}{unit}
        </span>
      </div>

      <ToggleGroup
        type="single"
        value={(currentLevel ?? 0).toString()}
        onValueChange={(val) => val && onChange(parseInt(val))}
        className="flex flex-wrap gap-1 justify-start"
      >
        {levels.map((_, index) => {
          const lvl = index;
          return (
            <ToggleGroupItem
              key={lvl}
              value={lvl.toString()}
              className="w-9 h-9 border rounded-md data-[state=on]:bg-green-300 "
            >
              {lvl}
            </ToggleGroupItem>
          );
        })}
      </ToggleGroup>
    </div>
  );
}