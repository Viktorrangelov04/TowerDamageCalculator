import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

interface StatInputProps {
  label: string;
  value: number;
  onChange: (val: number) => void; 
  placeholder?: string;
  unit?: string;
  min?: number;
  max?: number;
}

export function StatInput({ 
  label, 
  value, 
  onChange, 
  placeholder = "0", 
  unit = "UNIT",
  min, 
  max 
}: StatInputProps) {
  return (
    <div className="grid w-full max-w-sm items-center gap-1.5">
      <Label className="text-sm font-semibold text-gray-700 pl-1">
        {label}
      </Label>
      <div className="relative">
        <Input
          type="number"
          placeholder={placeholder}
          value={value === 0 ? "" : value} 
          onChange={(e) => {
            const val = parseFloat(e.target.value);
            let num = isNaN(val) ? 0 : val;

            if (min !== undefined) num = Math.max(num, min);
            if (max !== undefined) num = Math.min(num, max);

            onChange(num);
          }}
          className="pr-12 font-mono"
        />
        <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none text-muted-foreground text-[10px] font-bold uppercase">
          {unit}
        </div>
      </div>
    </div>
  );
}