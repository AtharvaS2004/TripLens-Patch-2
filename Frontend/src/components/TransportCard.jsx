import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"
import { Train, Plane, Car, Clock, IndianRupee } from "lucide-react"

const transportIcons = {
    train: Train,
    flight: Plane,
    car: Car,
}

const transportLabels = {
    train: "Train",
    flight: "Flight",
    car: "Car",
}

const badgeStyles = {
    "best-value": "bg-emerald-100 text-emerald-700 border-emerald-200",
    fastest: "bg-amber-100 text-amber-700 border-amber-200",
    "user-favorite": "bg-sky-100 text-sky-700 border-sky-200",
}

export function TransportCard({
    type,
    duration,
    price,
    badge,
    badgeVariant,
    isSelected,
    onSelect,
}) {
    const Icon = transportIcons[type]

    return (
        <Card
            className={cn(
                "cursor-pointer transition-all duration-200 hover:shadow-md",
                isSelected
                    ? "ring-2 ring-primary border-primary bg-primary/5"
                    : "hover:border-muted-foreground/30"
            )}
            onClick={onSelect}
        >
            <CardContent className="flex items-center gap-4 py-5">
                {/* Radio Button */}
                <div className="flex-shrink-0">
                    <div
                        className={cn(
                            "w-5 h-5 rounded-full border-2 flex items-center justify-center transition-colors",
                            isSelected
                                ? "border-primary bg-primary"
                                : "border-muted-foreground/40"
                        )}
                    >
                        {isSelected && (
                            <div className="w-2 h-2 rounded-full bg-primary-foreground" />
                        )}
                    </div>
                </div>

                {/* Transport Icon */}
                <div
                    className={cn(
                        "p-3 rounded-lg transition-colors",
                        isSelected ? "bg-primary/10" : "bg-muted"
                    )}
                >
                    <Icon className={cn("w-6 h-6", isSelected ? "text-primary" : "text-muted-foreground")} />
                </div>

                {/* Transport Info */}
                <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                        <h3 className="font-semibold text-lg">{transportLabels[type]}</h3>
                        <Badge variant="outline" className={badgeStyles[badgeVariant]}>
                            {badge}
                        </Badge>
                    </div>
                    <div className="flex items-center gap-4 text-muted-foreground">
                        <span className="flex items-center gap-1.5">
                            <Clock className="w-4 h-4" />
                            {duration}
                        </span>
                        <span className="flex items-center gap-1">
                            <IndianRupee className="w-4 h-4" />
                            {price}
                        </span>
                    </div>
                </div>

                {/* Select Label */}
                <div className="flex-shrink-0 hidden sm:block">
                    <span
                        className={cn(
                            "text-sm font-medium",
                            isSelected ? "text-primary" : "text-muted-foreground"
                        )}
                    >
                        {isSelected ? "Selected" : "Select"}
                    </span>
                </div>
            </CardContent>
        </Card>
    )
}
