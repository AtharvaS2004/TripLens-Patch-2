import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { MapPin, Pencil, Calendar } from "lucide-react"
import { Link } from "react-router-dom"

export function DraftTrips({ trips }) {
    const handleResumePlanning = (e, tripId) => {
        e.preventDefault()
        e.stopPropagation()
        console.log(`Resuming planning for trip ${tripId}`)
    }

    if (trips.length === 0) {
        return (
            <div className="text-center py-20 bg-muted/20 rounded-xl border border-dashed">
                <p className="text-muted-foreground">You don't have any saved drafts.</p>
                <Link to="/create-trip">
                    <Button variant="link" className="text-primary mt-2">Start a new trip</Button>
                </Link>
            </div>
        )
    }

    return (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {trips.map((trip) => {
                const progress = 30
                const imageUrl = `https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=600&auto=format&fit=crop&q=60`

                return (
                    <Link key={trip.id || trip.objectId} to={`/trip/${trip.id || trip.objectId}`} className="block">
                        <Card
                            className="group overflow-hidden border-0 bg-card shadow-sm transition-all hover:shadow-md hover:ring-1 hover:ring-primary/20"
                        >
                            <div className="relative h-36 overflow-hidden">
                                <img
                                    src={imageUrl}
                                    alt={trip.title}
                                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                                <div className="absolute bottom-3 left-3 right-3">
                                    <span className="inline-flex items-center gap-1 rounded-full bg-card/90 px-2 py-1 text-xs text-card-foreground backdrop-blur-sm shadow-sm">
                                        <Pencil className="h-3 w-3" />
                                        {progress}% complete
                                    </span>
                                </div>
                            </div>
                            <CardContent className="p-4">
                                <h3 className="mb-1.5 truncate font-semibold text-card-foreground">
                                    {trip.title}
                                </h3>
                                <div className="mb-3 flex items-center gap-1.5 text-xs text-muted-foreground">
                                    <MapPin className="h-3.5 w-3.5 text-primary" />
                                    <span className="truncate">{trip.destination}</span>
                                </div>
                                <div className="mb-4 flex items-center gap-1.5 text-xs text-muted-foreground">
                                    <Calendar className="h-3.5 w-3.5" />
                                    Saved draft
                                </div>

                                {/* Progress Bar */}
                                <div className="mb-4 h-1.5 w-full overflow-hidden rounded-full bg-muted">
                                    <div
                                        className="h-full rounded-full bg-primary transition-all"
                                        style={{ width: `${progress}%` }}
                                    />
                                </div>

                                <Button
                                    className="w-full gap-2 bg-primary text-primary-foreground hover:bg-primary/90 border-0"
                                    size="sm"
                                    onClick={(e) => handleResumePlanning(e, trip.id || trip.objectId)}
                                >
                                    <Pencil className="h-3.5 w-3.5" />
                                    Resume Planning
                                </Button>
                            </CardContent>
                        </Card>
                    </Link>
                )
            })}
        </div>
    )
}
