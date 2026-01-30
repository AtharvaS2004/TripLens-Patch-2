import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { MapPin, Calendar, Star, RotateCcw } from "lucide-react"
import { Link } from "react-router-dom"

export function PastTrips({ trips }) {
    const handlePlanAgain = (e, tripId) => {
        e.preventDefault()
        e.stopPropagation()
        console.log(`Creating new trip based on ${tripId}`)
    }

    if (trips.length === 0) {
        return (
            <div className="text-center py-20 bg-muted/20 rounded-xl border border-dashed">
                <p className="text-muted-foreground">No past trips yet. Time for a new one!</p>
                <Link to="/create-trip">
                    <Button variant="link" className="text-primary mt-2">Start a new trip</Button>
                </Link>
            </div>
        )
    }

    return (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {trips.map((trip) => {
                const rating = 5
                const imageUrl = `https://images.unsplash.com/photo-1519046904884-53103b34b206?w=600&auto=format&fit=crop&q=60`

                return (
                    <Link key={trip.id || trip.objectId} to={`/trip/${trip.id || trip.objectId}`} className="block">
                        <Card
                            className="group overflow-hidden border-0 bg-card shadow-sm transition-all hover:shadow-md hover:ring-1 hover:ring-primary/20"
                        >
                            <div className="relative h-40 overflow-hidden">
                                <img
                                    src={imageUrl}
                                    alt={trip.title}
                                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                                <div className="absolute bottom-3 left-3 flex items-center gap-0.5">
                                    {Array.from({ length: rating }).map((_, i) => (
                                        <Star
                                            key={i}
                                            className="h-4 w-4 fill-primary text-primary"
                                        />
                                    ))}
                                </div>
                            </div>
                            <CardContent className="p-4">
                                <h3 className="mb-1.5 truncate font-semibold text-card-foreground">
                                    {trip.title}
                                </h3>
                                <div className="mb-2 flex items-center gap-1.5 text-xs text-muted-foreground">
                                    <MapPin className="h-3.5 w-3.5 text-primary" />
                                    <span className="truncate">{trip.destination}</span>
                                </div>
                                <div className="mb-4 flex items-center gap-1.5 text-xs text-muted-foreground">
                                    <Calendar className="h-3.5 w-3.5" />
                                    {trip.startDate} - {trip.endDate}
                                </div>
                                <Button
                                    variant="outline"
                                    className="w-full gap-2 border-primary/30 text-foreground hover:bg-primary/10 hover:text-primary bg-transparent"
                                    size="sm"
                                    onClick={(e) => handlePlanAgain(e, trip.id || trip.objectId)}
                                >
                                    <RotateCcw className="h-3.5 w-3.5" />
                                    Plan Again
                                </Button>
                            </CardContent>
                        </Card>
                    </Link>
                )
            })}
        </div>
    )
}
