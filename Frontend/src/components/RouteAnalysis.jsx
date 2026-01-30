import { useState } from "react"
import { useLocation } from "react-router-dom"
import { TransportCard } from "@/components/TransportCard"
import { Button } from "@/components/ui/button"
import { MapPin, Calendar, Users, ArrowRight } from "lucide-react"
import { Navbar } from "@/components/Navbar"

export default function RouteAnalysis({ user, onLogout }) {
    const location = useLocation();
    const { startCity = "Pune", destination = "Goa", startDate = "Nov 25", travelers = 4 } = location.state || {};
    const [selectedOption, setSelectedOption] = useState(null)

    const handleGenerateItinerary = () => {
        if (selectedOption) {
            alert(`Generating itinerary with ${selectedOption} transport!`)
        }
    }

    return (
        <div className="min-h-screen bg-background">
            <Navbar user={user} onLogout={onLogout} />

            {/* Sticky Header - Sub Navbar */}
            <header className="sticky top-16 z-40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b">
                <div className="max-w-2xl mx-auto px-4 py-4">
                    <div className="flex flex-wrap items-center justify-center gap-x-4 gap-y-2 text-sm sm:text-base">
                        <div className="flex items-center gap-2">
                            <MapPin className="w-4 h-4 text-primary" />
                            <span className="font-semibold capitalize">{startCity} to {destination}</span>
                        </div>
                        <span className="text-muted-foreground hidden sm:inline">|</span>
                        <div className="flex items-center gap-2">
                            <Calendar className="w-4 h-4 text-muted-foreground" />
                            <span className="text-muted-foreground">{startDate}</span>
                        </div>
                        <span className="text-muted-foreground hidden sm:inline">|</span>
                        <div className="flex items-center gap-2">
                            <Users className="w-4 h-4 text-muted-foreground" />
                            <span className="text-muted-foreground">{travelers} Travelers</span>
                        </div>
                    </div>
                </div>
            </header>

            {/* Main Content */}
            <main className="max-w-2xl mx-auto px-4 py-8">
                <div className="mb-8">
                    <h1 className="text-2xl font-bold mb-2">Route Analysis</h1>
                    <p className="text-muted-foreground">
                        Select your preferred mode of transport for this journey
                    </p>
                </div>

                {/* Transport Options */}
                <div className="space-y-4 mb-8">
                    <TransportCard
                        type="train"
                        duration="12 Hours"
                        price="800"
                        badge="Best Value"
                        badgeVariant="best-value"
                        isSelected={selectedOption === "train"}
                        onSelect={() => setSelectedOption("train")}
                    />

                    <TransportCard
                        type="flight"
                        duration="1 Hour"
                        price="4,500"
                        badge="Fastest"
                        badgeVariant="fastest"
                        isSelected={selectedOption === "flight"}
                        onSelect={() => setSelectedOption("flight")}
                    />

                    <TransportCard
                        type="car"
                        duration="10 Hours"
                        price="1,500 (Fuel)"
                        badge="User Favorite"
                        badgeVariant="user-favorite"
                        isSelected={selectedOption === "car"}
                        onSelect={() => setSelectedOption("car")}
                    />
                </div>

                {/* Generate Button */}
                <div className="sticky bottom-4">
                    <Button
                        size="lg"
                        className="w-full h-14 text-base font-semibold shadow-lg"
                        disabled={!selectedOption}
                        onClick={handleGenerateItinerary}
                    >
                        Generate Itinerary
                        <ArrowRight className="w-5 h-5 ml-2" />
                    </Button>
                    {!selectedOption && (
                        <p className="text-center text-sm text-muted-foreground mt-3">
                            Please select a transport option to continue
                        </p>
                    )}
                </div>
            </main>
        </div>
    )
}
