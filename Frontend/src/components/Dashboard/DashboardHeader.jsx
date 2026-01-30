import { Plus, MapPin } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Link } from "react-router-dom"

export function DashboardHeader({ userName }) {
    return (
        <header className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-center gap-3">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
                    <MapPin className="h-6 w-6 text-primary" />
                </div>
                <div>
                    <p className="text-sm text-muted-foreground">Welcome back</p>
                    <h1 className="text-2xl font-semibold tracking-tight text-foreground">
                        Namaste, {userName}
                    </h1>
                </div>
            </div>
            <Link to="/create-trip">
                <Button className="gap-2 bg-primary text-primary-foreground hover:bg-primary/90 border-0">
                    <Plus className="h-4 w-4" />
                    Create New Trip
                </Button>
            </Link>
        </header>
    )
}
