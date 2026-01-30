import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Download, Share2, Calendar, Users, MapPin, Clock } from "lucide-react"
import { Link } from "react-router-dom"

export function UpcomingTrips({ trips }) {
    const handleDownloadPDF = (e, tripTitle) => {
        e.preventDefault()
        e.stopPropagation()
        console.log(`Downloading PDF for ${tripTitle}`)
    }

    const handleShareWhatsApp = (e, trip) => {
        e.preventDefault()
        e.stopPropagation()
        const message = encodeURIComponent(
            `Check out my upcoming trip: ${trip.title} to ${trip.destination} from ${trip.startDate} to ${trip.endDate}!`
        )
        window.open(`https://wa.me/?text=${message}`, "_blank")
    }

    const calculateDaysUntil = (startDateStr) => {
        const start = new Date(startDateStr)
        const today = new Date()
        const diffTime = start - today
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
        return diffDays > 0 ? diffDays : 0
    }

    if (trips.length === 0) {
        return (
            <div className="text-center py-20 bg-muted/20 rounded-xl border border-dashed">
                <p className="text-muted-foreground">No upcoming trips planned yet.</p>
                <Link to="/create-trip">
                    <Button variant="link" className="text-primary mt-2">Plan your next adventure</Button>
                </Link>
            </div>
        )
    }

    return (
        <div className="space-y-4">
            {trips.map((trip) => {
                const daysUntil = calculateDaysUntil(trip.startDate)
                const imageUrl = `https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800&auto=format&fit=crop&q=60`

                return (
                    <Link key={trip.id || trip.objectId} to={`/trip/${trip.id || trip.objectId}`} className="block">
                        <Card
                            className="group overflow-hidden border-0 bg-card shadow-sm transition-all hover:shadow-md hover:ring-1 hover:ring-primary/20"
                        >
                            <CardContent className="p-0">
                                <div className="flex flex-col lg:flex-row">
                                    {/* Trip Image */}
                                    <div className="relative h-48 w-full lg:h-auto lg:w-72 xl:w-80 overflow-hidden">
                                        <img
                                            src={imageUrl}
                                            alt={trip.title}
                                            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                                        />
                                        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent lg:bg-gradient-to-r" />
                                        <div className="absolute bottom-3 left-3 lg:bottom-4 lg:left-4">
                                            <div className="flex items-center gap-1.5 rounded-full bg-primary px-3 py-1.5 text-xs font-medium text-white shadow-lg">
                                                <Clock className="h-3.5 w-3.5" />
                                                Starts in {daysUntil} days
                                            </div>
                                        </div>
                                    </div>

                                    {/* Trip Details */}
                                    <div className="flex flex-1 flex-col justify-between p-5 lg:p-6">
                                        <div>
                                            <h3 className="mb-2 text-xl font-semibold text-card-foreground">
                                                {trip.title}
                                            </h3>
                                            <div className="mb-4 flex flex-wrap gap-4 text-sm text-muted-foreground">
                                                <div className="flex items-center gap-1.5">
                                                    <MapPin className="h-4 w-4 text-primary" />
                                                    {trip.destination}
                                                </div>
                                                <div className="flex items-center gap-1.5">
                                                    <Calendar className="h-4 w-4 text-primary" />
                                                    {trip.startDate} - {trip.endDate}
                                                </div>
                                                <div className="flex items-center gap-1.5">
                                                    <Users className="h-4 w-4 text-primary" />
                                                    {trip.travelers} travelers
                                                </div>
                                            </div>
                                        </div>

                                        {/* Action Buttons */}
                                        <div className="flex flex-wrap gap-3">
                                            <Button
                                                variant="outline"
                                                className="gap-2 border-primary/30 text-foreground hover:bg-primary/10 hover:text-primary bg-transparent"
                                                onClick={(e) => handleDownloadPDF(e, trip.title)}
                                            >
                                                <Download className="h-4 w-4" />
                                                Download PDF
                                            </Button>
                                            <Button
                                                className="gap-2 bg-[#25D366] text-white hover:bg-[#25D366]/90 border-0"
                                                onClick={(e) => handleShareWhatsApp(e, trip)}
                                            >
                                                <Share2 className="h-4 w-4" />
                                                Share on WhatsApp
                                            </Button>
                                        </div>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    </Link>
                )
            })}
        </div>
    )
}
