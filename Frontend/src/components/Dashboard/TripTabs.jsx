import { useState } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { UpcomingTrips } from "./UpcomingTrips"
import { DraftTrips } from "./DraftTrips"
import { PastTrips } from "./PastTrips"

export function TripTabs({ trips }) {
    const [activeTab, setActiveTab] = useState("upcoming")

    return (
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="mb-6 grid w-full max-w-md grid-cols-3 bg-muted/50 p-1">
                <TabsTrigger
                    value="upcoming"
                    className="data-[state=active]:bg-primary data-[state=active]:text-white"
                >
                    Upcoming
                </TabsTrigger>
                <TabsTrigger
                    value="drafts"
                    className="data-[state=active]:bg-primary data-[state=active]:text-white"
                >
                    Drafts
                </TabsTrigger>
                <TabsTrigger
                    value="past"
                    className="data-[state=active]:bg-primary data-[state=active]:text-white"
                >
                    Past Trips
                </TabsTrigger>
            </TabsList>

            <TabsContent value="upcoming" className="mt-0 outline-none">
                <UpcomingTrips trips={trips.upcoming} />
            </TabsContent>

            <TabsContent value="drafts" className="mt-0 outline-none">
                <DraftTrips trips={trips.drafts} />
            </TabsContent>

            <TabsContent value="past" className="mt-0 outline-none">
                <PastTrips trips={trips.past} />
            </TabsContent>
        </Tabs>
    )
}
