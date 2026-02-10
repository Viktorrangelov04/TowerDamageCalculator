import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress"; 

interface Props{
    name: string;
    value: string;
    onClick: () => void; 
    active: boolean;
}

export default function OverviewCard({ name, value, onClick, active }: Props) {
  return (
    <Card 
      onClick={onClick} 
      className={`cursor-pointer transition-all ${
        active 
          ? "ring-2 ring-primary shadow-md bg-primary/5" 
          : "hover:bg-gray-50 border-transparent"
      }`}
    >
      <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
        <CardTitle className="text-sm font-medium">{name}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="text-3xl font-bold">{value}</div>
        <div className="mt-4 space-y-2">
          <div className="flex justify-between text-xs text-muted-foreground">
            <span>Progress to Max</span>
            <span>100%</span>
          </div>
          <Progress value={100} className="h-2" />
        </div>
      </CardContent>
    </Card>
  );
}