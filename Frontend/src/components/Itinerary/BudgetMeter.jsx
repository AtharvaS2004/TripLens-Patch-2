import { Progress } from "@/components/ui/progress"
import { IndianRupee } from "lucide-react"

export function BudgetMeter({ spent, total }) {
    const percentage = Math.min((spent / total) * 100, 100)
    const isWithinBudget = spent <= total

    const formatCurrency = (value) => {
        if (value >= 1000) {
            return `${(value / 1000).toFixed(value % 1000 === 0 ? 0 : 1)}k`
        }
        return value.toString()
    }

    return (
        <div className="rounded-xl border border-border bg-card p-4 shadow-sm">
            <div className="mb-3 flex items-center justify-between">
                <div className="flex items-center gap-2">
                    <div
                        className={`flex h-8 w-8 items-center justify-center rounded-lg ${isWithinBudget ? "bg-success/10" : "bg-destructive/10"
                            }`}
                    >
                        <IndianRupee
                            className={`h-4 w-4 ${isWithinBudget ? "text-success" : "text-destructive"}`}
                        />
                    </div>
                    <span className="text-sm font-medium text-foreground">Budget Meter</span>
                </div>
                <span
                    className={`text-sm font-semibold ${isWithinBudget ? "text-success" : "text-destructive"}`}
                >
                    ₹{formatCurrency(spent)} / ₹{formatCurrency(total)}
                </span>
            </div>
            <div className="relative">
                <Progress
                    value={percentage}
                    className={`h-3 ${isWithinBudget ? "[&>div]:bg-success" : "[&>div]:bg-destructive"}`}
                />
            </div>
            <div className="mt-2 flex justify-between text-xs text-muted-foreground">
                <span>{isWithinBudget ? "Within budget" : "Over budget!"}</span>
                <span>
                    {isWithinBudget
                        ? `₹${formatCurrency(total - spent)} remaining`
                        : `₹${formatCurrency(spent - total)} over`}
                </span>
            </div>
        </div>
    )
}
