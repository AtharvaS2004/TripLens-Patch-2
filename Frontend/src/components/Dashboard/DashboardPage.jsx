import { useState, useEffect } from "react"
import { DashboardHeader } from "./DashboardHeader"
import { TripTabs } from "./TripTabs"
import { Navbar } from "@/components/Navbar"
import { Loader2 } from "lucide-react"

export default function DashboardPage({ user, onLogout }) {
    const [trips, setTrips] = useState({ upcoming: [], drafts: [], past: [] })
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)

    const userName = user?.userName || "Traveler"

    useEffect(() => {
        const fetchTrips = async () => {
            if (!user?.objectId) {
                setLoading(false)
                return
            }

            try {
                const response = await fetch(`http://localhost:8080/trips/getTripsByUserId?userId=${user.objectId}`, {
                    method: 'POST', // The backend uses @PostMapping for getTripsByUserId
                })

                if (!response.ok) {
                    throw new Error('Failed to fetch trips')
                }

                const data = await response.json()

                // Categorize trips
                const now = new Date()
                const categorized = {
                    upcoming: [],
                    drafts: [],
                    past: []
                }

                data.forEach(trip => {
                    const startDate = new Date(trip.startDate)
                    const endDate = new Date(trip.endDate)
                    const isInvalidDate = isNaN(startDate.getTime()) || isNaN(endDate.getTime())

                    // Simple categorization logic
                    if (!trip.status || isInvalidDate) {
                        categorized.drafts.push(trip)
                    } else if (endDate < now) {
                        categorized.past.push(trip)
                    } else {
                        categorized.upcoming.push(trip)
                    }
                })

                setTrips(categorized)
            } catch (err) {
                console.error("Error fetching trips:", err)
                setError("Could not load your trips. Please try again later.")
            } finally {
                setLoading(false)
            }
        }

        fetchTrips()
    }, [user])

    return (
        <div className="min-h-screen bg-background text-foreground">
            <Navbar user={user} onLogout={onLogout} />
            <main className="mx-auto max-w-6xl px-4 py-12 sm:px-6 lg:px-8">
                <DashboardHeader userName={userName} />

                <section className="mt-8">
                    {loading ? (
                        <div className="flex flex-col items-center justify-center py-20 gap-4">
                            <Loader2 className="h-8 w-8 animate-spin text-primary" />
                            <p className="text-muted-foreground">Loading your journeys...</p>
                        </div>
                    ) : error ? (
                        <div className="text-center py-20">
                            <p className="text-destructive font-medium">{error}</p>
                        </div>
                    ) : (
                        <TripTabs trips={trips} />
                    )}
                </section>
            </main>
        </div>
    )
}
