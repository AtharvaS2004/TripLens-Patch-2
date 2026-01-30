import { useState, useEffect } from "react"
import { useParams } from "react-router-dom"
import { BudgetMeter } from "./BudgetMeter"
import { Timeline } from "./Timeline"
import { SpotDetails } from "./SpotDetails"
import { MapPin, Loader2, AlertCircle } from "lucide-react"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"

const FALLBACK_DATA = {
    jaipur: [
        {
            id: "j1",
            time: "9:00 AM",
            name: "Amer Fort",
            day: 1,
            cost: 500,
            image: "https://images.unsplash.com/photo-1590424745343-4560b4cb936c?w=800&auto=format&fit=crop&q=60",
            description: "Amer Fort is a magnificent castle located in Amer, Rajasthan. Built with red sandstone and marble, it overlook Maotha Lake.",
            rating: 4.8,
            bestTimeToVisit: "Morning",
        },
        {
            id: "j2",
            time: "12:00 PM",
            name: "Hawa Mahal",
            day: 1,
            cost: 200,
            image: "https://images.unsplash.com/photo-1615555460598-a6d59f795764?w=800&auto=format&fit=crop&q=60",
            description: "The 'Palace of Winds' is a unique five-story structure with 953 small windows called jharokhas.",
            rating: 4.6,
            bestTimeToVisit: "Morning",
        },
        {
            id: "j-lunch",
            time: "1:30 PM",
            name: "Lunch at Chokhi Dhani",
            day: 1,
            cost: 1000,
            image: "",
            description: "",
            rating: 0,
            bestTimeToVisit: "",
            isBreak: true,
        },
        {
            id: "j3",
            time: "3:30 PM",
            name: "City Palace",
            day: 1,
            cost: 700,
            image: "https://images.unsplash.com/photo-1599661046289-e31887846eac?w=800&auto=format&fit=crop&q=60",
            description: "City Palace includes the Chandra Mahal and Mubarak Mahal palaces and other buildings.",
            rating: 4.5,
            bestTimeToVisit: "Afternoon",
        },
    ],
    varanasi: [
        {
            id: "v1",
            time: "6:00 AM",
            name: "Ganga Sunrise Boat Ride",
            day: 1,
            cost: 500,
            image: "https://images.unsplash.com/photo-1561361513-2d000a50f0dc?w=800&auto=format&fit=crop&q=60",
            description: "Experience the spiritual essence of Varanasi with a sunrise boat ride along the sacred Ganges river.",
            rating: 4.9,
            bestTimeToVisit: "Early Morning",
        },
        {
            id: "v2",
            time: "10:00 AM",
            name: "Kashi Vishwanath Temple",
            day: 1,
            cost: 0,
            image: "https://images.unsplash.com/photo-1627894483216-2138af692e32?w=800&auto=format&fit=crop&q=60",
            description: "One of the most famous Hindu temples dedicated to Lord Shiva, located in the heart of the city.",
            rating: 4.9,
            bestTimeToVisit: "Morning",
        },
        {
            id: "v-lunch",
            time: "1:00 PM",
            name: "Lunch - Local Street Food",
            day: 1,
            cost: 400,
            image: "",
            description: "",
            rating: 0,
            bestTimeToVisit: "",
            isBreak: true,
        },
        {
            id: "v3",
            time: "4:00 PM",
            name: "Sarnath",
            day: 1,
            cost: 300,
            image: "https://images.unsplash.com/photo-1625308544834-8c6f14068305?w=800&auto=format&fit=crop&q=60",
            description: "The place where Gautama Buddha first taught the Dharma, and where the Buddhist Sangha came into existence.",
            rating: 4.7,
            bestTimeToVisit: "Afternoon",
        },
        {
            id: "v4",
            time: "6:30 PM",
            name: "Dashashwamedh Ghat Aarti",
            day: 1,
            cost: 0,
            image: "https://images.unsplash.com/photo-1590424754714-d029584fd09e?w=800&auto=format&fit=crop&q=60",
            description: "Witness the grand 'Ganga Aarti' ceremony, a powerful and spiritual ritual performed every evening.",
            rating: 5.0,
            bestTimeToVisit: "Evening",
        },
    ],
    goa: [
        {
            id: "g1",
            time: "9:00 AM",
            name: "Aguada Fort",
            day: 1,
            cost: 500,
            image: "https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?w=800&auto=format&fit=crop&q=60",
            description: "A well-preserved 17th-century Portuguese fort standing in Goa overlooking the Arabian Sea.",
            rating: 4.5,
            bestTimeToVisit: "Morning",
        },
        {
            id: "g2",
            time: "11:30 AM",
            name: "Sinquerim Beach",
            day: 1,
            cost: 200,
            image: "https://images.unsplash.com/photo-1544750040-4ea9b8a27d38?w=800&auto=format&fit=crop&q=60",
            description: "A serene stretch of golden sand nestled at the base of Aguada Fort.",
            rating: 4.2,
            bestTimeToVisit: "Late Morning",
        },
        {
            id: "g-lunch",
            time: "1:00 PM",
            name: "Shack Lunch",
            day: 1,
            cost: 800,
            image: "",
            description: "",
            rating: 0,
            bestTimeToVisit: "",
            isBreak: true,
        },
    ]
}

const DEFAULT_ACTIVITIES = [
    {
        id: "d1",
        time: "10:00 AM",
        name: "Local Sightseeing",
        day: 1,
        cost: 500,
        image: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800&auto=format&fit=crop&q=60",
        description: "Explore the local beauty and unique spots of your destination.",
        rating: 4.5,
        bestTimeToVisit: "Anytime",
    }
]

const TOTAL_BUDGET = 15000

export function ItineraryPlanner() {
    const { tripId } = useParams()
    const [activities, setActivities] = useState(DEFAULT_ACTIVITIES)
    const [selectedActivity, setSelectedActivity] = useState(DEFAULT_ACTIVITIES[0])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)
    const [tripInfo, setTripInfo] = useState({ title: "My Trip", destination: "Exploring" })

    useEffect(() => {
        const fetchItinerary = async () => {
            if (!tripId) return

            setLoading(true)
            try {
                const tripsResponse = await fetch('http://localhost:8080/trips/getTripsByUserId', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
                    body: new URLSearchParams({ userId: JSON.parse(localStorage.getItem('user'))?.objectId }).toString()
                })

                if (tripsResponse.ok) {
                    const trips = await tripsResponse.json()
                    const currentTrip = trips.find(t => t.objectId === tripId || t.id === tripId)
                    if (currentTrip) {
                        const dest = currentTrip.destination?.toLowerCase() || ""
                        setTripInfo({
                            title: currentTrip.title || "My Trip",
                            destination: currentTrip.destination || "Exploring"
                        })

                        // Determine fallback data based on destination
                        let fallback = DEFAULT_ACTIVITIES
                        if (dest.includes("jaipur")) fallback = FALLBACK_DATA.jaipur
                        else if (dest.includes("varanasi")) fallback = FALLBACK_DATA.varanasi
                        else if (dest.includes("goa")) fallback = FALLBACK_DATA.goa

                        setActivities(fallback)
                        setSelectedActivity(fallback.find(a => !a.isBreak) || fallback[0])

                        if (currentTrip.itineraryId) {
                            const itineraryResponse = await fetch('http://localhost:8080/api/itineraries/getItinerary', {
                                method: 'POST',
                                headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
                                body: new URLSearchParams({ itineraryId: currentTrip.itineraryId }).toString()
                            })

                            if (itineraryResponse.ok) {
                                const itineraryData = await itineraryResponse.json()
                                if (itineraryData && itineraryData.dayPlans && itineraryData.dayPlans.length > 0) {
                                    const mappedActivities = itineraryData.dayPlans.map((name, index) => ({
                                        id: `db-${index}`,
                                        name: name,
                                        time: `${9 + index}:00 AM`,
                                        day: 1,
                                        cost: 200 * (index + 1),
                                        image: "https://images.unsplash.com/photo-1590424754714-d029584fd09e?w=800&auto=format&fit=crop&q=60",
                                        description: "Details for your saved destination.",
                                        rating: 4.5,
                                        bestTimeToVisit: "Morning"
                                    }))
                                    setActivities(mappedActivities)
                                    setSelectedActivity(mappedActivities[0])
                                    setError(null)
                                } else {
                                    setError(`Showing suggested itinerary for ${currentTrip.destination}.`)
                                }
                            } else {
                                setError(`Showing suggested itinerary for ${currentTrip.destination}.`)
                            }
                        } else {
                            setError(`Showing suggested itinerary for ${currentTrip.destination}.`)
                        }
                    }
                }
            } catch (err) {
                console.error("Failed to fetch itinerary:", err)
                setError("Using sample itinerary for your destination.")
            } finally {
                setLoading(false)
            }
        }

        fetchItinerary()
    }, [tripId])

    const totalSpent = activities.reduce((sum, activity) => sum + (activity.cost || 0), 0)

    const handleRemove = (id) => {
        setActivities((prev) => prev.filter((activity) => activity.id !== id))
        if (selectedActivity?.id === id) {
            const remaining = activities.filter((a) => a.id !== id && !a.isBreak)
            setSelectedActivity(remaining[0] || null)
        }
    }

    const handleSelect = (activity) => {
        if (!activity.isBreak) {
            setSelectedActivity(activity)
        }
    }

    if (loading) {
        return (
            <div className="flex h-screen items-center justify-center bg-background">
                <div className="flex flex-col items-center gap-4">
                    <Loader2 className="h-10 w-10 animate-spin text-primary" />
                    <p className="text-muted-foreground animate-pulse">Loading your itinerary...</p>
                </div>
            </div>
        )
    }

    return (
        <div className="flex h-screen flex-col bg-background">
            <header className="shrink-0 border-b border-border bg-card px-6 py-4">
                <div className="mx-auto max-w-7xl">
                    <div className="mb-4 flex items-center justify-between">
                        <div className="flex items-center gap-3">
                            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary">
                                <MapPin className="h-5 w-5 text-white" />
                            </div>
                            <div>
                                <h1 className="text-xl font-bold text-foreground">
                                    {tripInfo.title}
                                </h1>
                                <p className="text-sm text-muted-foreground font-medium">
                                    {tripInfo.destination} • {activities.filter((a) => !a.isBreak).length} Activities
                                </p>
                            </div>
                        </div>
                    </div>
                    <BudgetMeter spent={totalSpent} total={TOTAL_BUDGET} />
                </div>
            </header>

            <main className="flex min-h-0 flex-1 flex-col md:flex-row">
                <aside className="w-full md:w-80 lg:w-96 shrink-0 overflow-y-auto border-r border-border bg-muted/10 p-6 scrollbar-hide">
                    <h2 className="mb-4 text-lg font-semibold text-foreground">
                        Your Timeline
                    </h2>
                    {error && (
                        <Alert className="mb-4 py-2 border-orange-500/20 bg-orange-500/5">
                            <AlertCircle className="h-4 w-4 text-orange-500" />
                            <AlertDescription className="text-xs text-orange-500">{error}</AlertDescription>
                        </Alert>
                    )}
                    <Timeline
                        activities={activities}
                        selectedId={selectedActivity?.id || null}
                        onSelect={handleSelect}
                        onRemove={handleRemove}
                    />
                </aside>

                <section className="flex-1 overflow-y-auto bg-muted/20 p-6 scrollbar-hide">
                    <div className="mx-auto h-full max-w-3xl">
                        <SpotDetails activity={selectedActivity} />
                    </div>
                </section>
            </main>
        </div>
    )
}
