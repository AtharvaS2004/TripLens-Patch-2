import { Clock, Trash2, Coffee } from "lucide-react"
import { Button } from "@/components/ui/button"

export function Timeline({ activities, selectedId, onSelect, onRemove }) {
    const groupedByDay = activities.reduce((acc, activity) => {
        if (!acc[activity.day]) {
            acc[activity.day] = []
        }
        acc[activity.day].push(activity)
        return acc
    }, {})

    const days = Object.keys(groupedByDay)
        .map(Number)
        .sort((a, b) => a - b)

    return (
        <div className="flex flex-col gap-6">
            {days.map((day) => (
                <div key={day}>
                    <div className="mb-3 flex items-center gap-2">
                        <span className="rounded-full bg-primary px-3 py-1 text-xs font-semibold text-white">
                            Day {day}
                        </span>
                    </div>
                    <div className="relative ml-3 border-l-2 border-border pl-6">
                        {groupedByDay[day].map((activity) => (
                            <div
                                key={activity.id}
                                className={`relative mb-4 last:mb-0 ${activity.isBreak ? "" : "cursor-pointer"}`}
                            >
                                {/* Timeline dot */}
                                <div
                                    className={`absolute -left-[31px] top-2 h-4 w-4 rounded-full border-2 ${activity.isBreak
                                            ? "border-muted-foreground bg-muted"
                                            : selectedId === activity.id
                                                ? "border-primary bg-primary"
                                                : "border-primary bg-card"
                                        }`}
                                />

                                {activity.isBreak ? (
                                    <div className="flex items-center gap-3 rounded-lg border border-dashed border-border bg-muted/50 px-4 py-3">
                                        <Coffee className="h-4 w-4 text-muted-foreground" />
                                        <div>
                                            <p className="text-sm font-medium text-muted-foreground">
                                                {activity.name}
                                            </p>
                                            <p className="text-xs text-muted-foreground/70">{activity.time}</p>
                                        </div>
                                    </div>
                                ) : (
                                    <div
                                        onClick={() => onSelect(activity)}
                                        className={`group rounded-lg border p-4 transition-all hover:border-primary/50 hover:shadow-md ${selectedId === activity.id
                                                ? "border-primary bg-primary/5 shadow-md"
                                                : "border-border bg-card"
                                            }`}
                                    >
                                        <div className="flex items-start justify-between gap-3">
                                            <div className="flex-1">
                                                <div className="mb-1 flex items-center gap-2">
                                                    <Clock className="h-3.5 w-3.5 text-muted-foreground" />
                                                    <span className="text-xs font-medium text-muted-foreground">
                                                        {activity.time}
                                                    </span>
                                                </div>
                                                <h4 className="font-medium text-foreground">{activity.name}</h4>
                                                <p className="mt-1 text-xs text-muted-foreground">
                                                    ₹{activity.cost?.toLocaleString() || 0}
                                                </p>
                                            </div>
                                            <Button
                                                variant="ghost"
                                                size="icon"
                                                className="h-8 w-8 shrink-0 text-muted-foreground opacity-0 transition-opacity hover:bg-destructive/10 hover:text-destructive group-hover:opacity-100 border-0"
                                                onClick={(e) => {
                                                    e.stopPropagation()
                                                    onRemove(activity.id)
                                                }}
                                            >
                                                <Trash2 className="h-4 w-4" />
                                                <span className="sr-only">Remove activity</span>
                                            </Button>
                                        </div>
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                </div>
            ))}
        </div>
    )
}
