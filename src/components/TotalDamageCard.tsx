import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { formatCompactNumber } from "@/utils/numberFormatter";

interface Props {
    name: string;
    value: number;
    value2?: any;
}

export default function TotalDamageCard({ name, value, value2 = 1 }: Props) {
    return (
        <Card>
            <CardHeader className="flex flex-row items-center justify-between my-auto space-y-0">
                <CardTitle className="text-sm font-medium">{name}</CardTitle>
            </CardHeader>
            <CardContent>
                
                {value2 ? (
                    <div className="text-xl font-bold">New: {formatCompactNumber(value)}</div>
                ) : (
                    <div className="text-3xl font-bold">{formatCompactNumber(value)}</div>
                )}
                   
                {value2 ? (
                    <div>
                        <div className="text-xl font-bold">
                            Old: {formatCompactNumber(value2)}
                        </div>
                        <div className={`text-lg ${value>value2 ? "text-green-500" : "text-red-300"}`}>
                            Diff: {((value/value2)*100-100).toFixed()}%
                        </div>
                    </div>
                ) : (
                    <span className="text-red-500">Save build to compare</span>
                )}
            </CardContent>
        </Card>
    );
}
