import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, ArrowRight, Train, Plane, Bus } from "lucide-react"



export function PopularRoutesSection() {
    const routes = [
        {
            from: "Mumbai",
            to: "Goa",
            price: "1,200",
            time: "8h 30m",
            mode: "Train",
            rating: 4.8,
            image: "/images/mumbai-goa.jpg",
            badge: "Save 40%"
        },
        {
            from: "Delhi",
            to: "Jaipur",
            price: "800",
            time: "4h 45m",
            mode: "Train",
            rating: 4.7,
            image: "/images/delhi-jaipur.jpg",
            badge: "Save 35%"
        },
        {
            from: "Bangalore",
            to: "Ooty",
            price: "1,500",
            time: "6h",
            mode: "Bus",
            rating: 4.9,
            image: "/images/bangalore-ooty.jpg",
            badge: "Scenic route"
        },
        {
            from: "Chennai",
            to: "Pondicherry",
            price: "450",
            time: "3h",
            mode: "Bus",
            rating: 4.6,
            image: "/images/chennai-pondicherry.jpg",
            badge: "Quick trip"
        }
    ]

    return (
        <section id="routes" className="py-20 bg-background/50">
            <div className="container px-4 md:px-6">
                <div className="flex flex-col md:flex-row justify-between items-end mb-12">
                    <div className="max-w-xl">
                        <span className="text-primary font-semibold tracking-wider text-sm uppercase">Popular Routes</span>
                        <h2 className="text-3xl md:text-5xl font-bold mt-2">Trending Destinations</h2>
                        <p className="text-muted-foreground mt-4 text-lg">
                            Most booked routes by TripLens travelers. Compare prices and find your perfect journey.
                        </p>
                    </div>
                    <div className="hidden md:flex gap-2">
                        <Button variant="outline" size="icon" className="rounded-full"><ArrowLeft className="h-4 w-4" /></Button>
                        <Button variant="outline" size="icon" className="rounded-full"><ArrowRight className="h-4 w-4" /></Button>
                    </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    {routes.map((route, i) => (
                        <div key={i} className="group rounded-2xl border bg-card text-card-foreground shadow-sm overflow-hidden hover:shadow-lg transition-all duration-300">
                            <div className="relative h-48 overflow-hidden">
                                <img
                                    src={route.image}
                                    alt={`${route.from} to ${route.to}`}
                                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                                />
                                <div className="absolute top-3 right-3">
                                    <Badge className="bg-primary/90 hover:bg-primary text-primary-foreground backdrop-blur-md">
                                        {route.badge}
                                    </Badge>
                                </div>
                                <div className="absolute bottom-3 left-3 text-white font-bold drop-shadow-md">
                                    {route.from} <ArrowRight className="inline h-4 w-4 mx-1" /> {route.to}
                                </div>
                            </div>

                            <div className="p-5">
                                <div className="flex justify-between items-center mb-4">
                                    <div>
                                        <span className="text-2xl font-bold text-primary">₹ {route.price}</span>
                                    </div>
                                    <div className="flex items-center gap-1 text-muted-foreground text-sm">
                                        {route.mode === 'Train' ? <Train className="h-4 w-4" /> : route.mode === 'Bus' ? <Bus className="h-4 w-4" /> : <Plane className="h-4 w-4" />}
                                        {route.mode}
                                    </div>
                                </div>

                                <div className="flex justify-between items-center text-sm text-neutral-500 mb-6">
                                    <div className="flex items-center bg-secondary px-3 py-1 rounded-full">
                                        <span className="mr-2">⏱️</span> {route.time}
                                    </div>
                                </div>

                                <Button variant="outline" className="w-full rounded-xl hover:bg-primary hover:text-primary-foreground transition-colors">
                                    View Options
                                </Button>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="mt-12 text-center">
                    <Button size="lg" className="rounded-full px-8 bg-gradient-to-r from-primary to-accent hover:opacity-90 transition-opacity">
                        Explore All Routes <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                </div>
            </div>
        </section>
    )
}
