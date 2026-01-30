import { ArrowRight, Wallet, Map, Train } from "lucide-react"

export function FeaturesSection() {
    const features = [
        {
            icon: <Train className="h-10 w-10 text-primary" />,
            title: "Smart Compare",
            subtitle: "Train vs Flight vs Bus",
            description: "Compare trains, flights, and buses side-by-side. See real-time prices, travel times, and convenience scores to make the best choice for your journey."
        },
        {
            icon: <Map className="h-10 w-10 text-primary" />,
            title: "Hidden Gems",
            subtitle: "Explore the unexplored",
            description: "Discover off-beat destinations, local experiences, and secret spots that only locals know. Curated recommendations based on your travel style."
        },
        {
            icon: <Wallet className="h-10 w-10 text-primary" />,
            title: "Budget Tracking",
            subtitle: "Travel within budget",
            description: "Set your travel budget and track expenses in real-time. Get alerts when you're about to overspend and find cheaper alternatives instantly."
        }
    ]

    return (
        <section id="features" className="py-20 bg-secondary/50">
            <div className="container px-4 md:px-6">
                <div className="text-center max-w-2xl mx-auto mb-16">
                    <span className="text-primary font-semibold tracking-wider text-sm uppercase">Why TripLens?</span>
                    <h2 className="text-3xl md:text-5xl font-bold mt-2 mb-4">Travel Smarter, Not Harder</h2>
                    <p className="text-muted-foreground text-lg">
                        From planning to exploring, we make every step of your journey effortless and enjoyable.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {features.map((feature, index) => (
                        <div
                            key={index}
                            className="group relative bg-card hover:shadow-xl transition-all duration-300 rounded-2xl p-8 border border-border"
                        >
                            <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity">
                                <span className="text-9xl font-bold font-serif">{index + 1}</span>
                            </div>

                            <div className="bg-primary/10 w-20 h-20 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                                {feature.icon}
                            </div>

                            <h3 className="text-2xl font-bold mb-2">{feature.title}</h3>
                            <p className="text-primary font-medium mb-4">{feature.subtitle}</p>
                            <p className="text-muted-foreground leading-relaxed mb-6">
                                {feature.description}
                            </p>

                            <div className="flex items-center text-primary font-semibold group/link cursor-pointer">
                                Learn more <ArrowRight className="ml-2 h-4 w-4 transform group-hover/link:translate-x-1 transition-transform" />
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}
