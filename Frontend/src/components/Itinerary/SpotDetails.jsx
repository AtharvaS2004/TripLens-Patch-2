import { Star, Clock, MapPin } from "lucide-react"
import { Badge } from "@/components/ui/badge"

export function SpotDetails({ activity }) {
    if (!activity) {
        return (
            <div className="flex h-full flex-col items-center justify-center rounded-xl border border-dashed border-border bg-muted/30 p-8 text-center">
                <MapPin className="mb-4 h-12 w-12 text-muted-foreground/50" />
                <h3 className="mb-2 text-lg font-medium text-foreground">
                    Select an Activity
                </h3>
                <p className="text-sm text-muted-foreground">
                    Click on any activity from the timeline to view its details
                </p>
            </div>
        )
    }

    const renderStars = (rating) => {
        return Array.from({ length: 5 }, (_, i) => (
            <Star
                key={i}
                className={`h-5 w-5 ${i < Math.floor(rating)
                        ? "fill-orange-400 text-orange-400"
                        : i < rating
                            ? "fill-orange-400/50 text-orange-400"
                            : "fill-muted text-muted-foreground/30"
                    }`}
            />
        ))
    }

    return (
        <div className="flex h-full flex-col overflow-hidden rounded-xl border border-border bg-card shadow-sm">
            {/* Image */}
            <div className="relative h-64 w-full shrink-0 overflow-hidden">
                <img
                    src={activity.image || "https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?w=800&auto=format&fit=crop&q=60"}
                    alt={activity.name}
                    className="h-full w-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                <div className="absolute bottom-4 left-4 right-4">
                    <h2 className="text-2xl font-bold text-white drop-shadow-lg">
                        {activity.name}
                    </h2>
                </div>
            </div>

            {/* Content */}
            <div className="flex flex-1 flex-col gap-6 overflow-y-auto p-6">
                {/* Rating and Badge */}
                <div className="flex flex-wrap items-center justify-between gap-4">
                    <div className="flex items-center gap-2">
                        <div className="flex">{renderStars(activity.rating || 4.5)}</div>
                        <span className="text-sm font-medium text-foreground">
                            {(activity.rating || 4.5).toFixed(1)}
                        </span>
                    </div>
                    <Badge variant="outline" className="gap-1.5 bg-primary/10 text-primary border-0">
                        <Clock className="h-3.5 w-3.5" />
                        Best Time: {activity.bestTimeToVisit || "Morning"}
                    </Badge>
                </div>

                {/* Description */}
                <div>
                    <h3 className="mb-2 text-sm font-semibold uppercase tracking-wide text-muted-foreground">
                        About this place
                    </h3>
                    <p className="leading-relaxed text-foreground/90">
                        {activity.description || "Explore this beautiful destination and enjoy the local vibes."}
                    </p>
                </div>

                {/* Quick Info */}
                <div className="mt-auto grid grid-cols-2 gap-4 rounded-lg bg-muted/50 p-4">
                    <div>
                        <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
                            Scheduled Time
                        </p>
                        <p className="mt-1 text-lg font-semibold text-foreground">
                            {activity.time}
                        </p>
                    </div>
                    <div>
                        <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
                            Estimated Cost
                        </p>
                        <p className="mt-1 text-lg font-semibold text-foreground">
                            ₹{activity.cost?.toLocaleString() || 0}
                        </p>
                    </div>
                </div>
            </div>
        </div>
    )
}
