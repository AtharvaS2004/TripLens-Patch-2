import { useState } from "react";
import { Search, MapPin, Calendar as CalendarIcon, Train, CalendarDays } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@radix-ui/react-radio-group";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { Calendar } from "@/components/ui/calendar";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";
import { useNavigate } from "react-router-dom";

// Minimal Radio Group Wrapper
const RadioGroupWrapper = ({ value, onValueChange, className, children }) => (
    <RadioGroup value={value} onValueChange={onValueChange} className={cn("grid gap-2", className)}>
        {children}
    </RadioGroup>
);

const RadioGroupItemWrapper = ({ value, id, className }) => (
    <RadioGroupItem value={value} id={id} className={cn(
        "aspect-square h-4 w-4 rounded-full border border-primary text-primary ring-offset-background focus:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
        "data-[state=checked]:bg-primary data-[state=checked]:text-primary-foreground",
        className
    )}>
        <span className="flex items-center justify-center"></span>
    </RadioGroupItem>
);

export function HeroSection() {
    const [startCity, setStartCity] = useState("");
    const [destination, setDestination] = useState("");
    const [startDate, setStartDate] = useState();
    const [endDate, setEndDate] = useState();
    const [budget, setBudget] = useState("family");

    const navigate = useNavigate();

    // Helper to clear or set to today
    const handleClear = (setter) => {
        setter(undefined);
    };
    const handleToday = (setter) => {
        setter(new Date());
    };

    const handleSearch = () => {
        const searchData = {
            startCity,
            destination,
            startDate: startDate ? format(startDate, "yyyy-MM-dd") : undefined,
            endDate: endDate ? format(endDate, "yyyy-MM-dd") : undefined,
            budget,
            travelers: 1 // Default or add traveler input later
        };
        console.log(searchData);
        navigate('/route-analysis', { state: searchData });
    };

    return (
        <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
            {/* Background Image with Overlay */}
            <div
                className="absolute inset-0 bg-cover bg-center"
                style={{
                    backgroundImage: "url('/images/hero-travel.jpg')"
                }}
            >
                <div className="absolute inset-0 bg-black/40" />
            </div>

            {/* Content */}
            <div className="relative z-10 w-full max-w-6xl mx-auto px-4 py-20 text-center">
                {/* Logo */}
                <div className="mb-6 flex justify-center items-center gap-2">
                    <Train className="h-10 w-10 text-primary" />
                    <span className="text-primary text-4xl font-bold tracking-tight">
                        TripLens
                    </span>
                </div>

                {/* Tagline */}
                <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-6 text-balance leading-tight drop-shadow-lg">
                    Dekho India.
                    <br />
                    Dekho World.
                </h1>
                <p className="text-white/90 text-lg md:text-xl mb-12 max-w-2xl mx-auto text-pretty drop-shadow-md font-medium">
                    Compare trains, flights & buses. Discover hidden gems. Travel smart.
                </p>

                {/* Search Card */}
                <div className="bg-white/95 backdrop-blur-md rounded-2xl shadow-2xl p-6 md:p-8 max-w-5xl mx-auto">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
                        {/* Start City */}
                        <div className="relative">
                            <Label htmlFor="startCity" className="sr-only">Start City</Label>
                            <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                            <Input
                                id="startCity"
                                placeholder="Start City"
                                value={startCity}
                                onChange={(e) => setStartCity(e.target.value)}
                                className="pl-10 h-12 bg-secondary border-border text-foreground placeholder:text-muted-foreground"
                            />
                        </div>

                        {/* Destination */}
                        <div className="relative">
                            <Label htmlFor="destination" className="sr-only">Destination</Label>
                            <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-primary" />
                            <Input
                                id="destination"
                                placeholder="Destination"
                                value={destination}
                                onChange={(e) => setDestination(e.target.value)}
                                className="pl-10 h-12 bg-secondary border-border text-foreground placeholder:text-muted-foreground"
                            />
                        </div>

                        {/* Start Date Picker */}
                        <div className="relative">
                            <Label htmlFor="startDate" className="sr-only">Departure Date</Label>
                            <Popover>
                                <PopoverTrigger asChild>
                                    <Button
                                        variant={"outline"}
                                        className={cn(
                                            "w-full h-12 px-3 text-left font-normal bg-[#FFF9F0] border-border hover:bg-[#FFF9F0]/80 hover:text-foreground flex items-center justify-between",
                                            !startDate && "text-muted-foreground"
                                        )}
                                    >
                                        <div className="flex items-center">
                                            <CalendarIcon className="h-5 w-5 text-muted-foreground mr-2 opacity-70" />
                                            {startDate ? format(startDate, "dd-MM-yyyy") : <span>Departure</span>}
                                        </div>
                                        <CalendarDays className="h-4 w-4 text-muted-foreground opacity-50" />
                                    </Button>
                                </PopoverTrigger>
                                <PopoverContent className="w-auto p-0" align="start">
                                    <Calendar
                                        mode="single"
                                        selected={startDate}
                                        onSelect={setStartDate}
                                        initialFocus
                                        className="rounded-t-md"
                                    />
                                    {/* Custom Footer */}
                                    <div className="flex items-center justify-between px-4 pb-4 pt-0">
                                        <Button
                                            variant="ghost"
                                            size="sm"
                                            className="text-primary hover:text-primary/80 h-auto p-0 font-medium"
                                            onClick={() => handleClear(setStartDate)}
                                        >
                                            Clear
                                        </Button>
                                        <Button
                                            variant="ghost"
                                            size="sm"
                                            className="text-primary hover:text-primary/80 h-auto p-0 font-medium"
                                            onClick={() => handleToday(setStartDate)}
                                        >
                                            Today
                                        </Button>
                                    </div>
                                </PopoverContent>
                            </Popover>
                        </div>

                        {/* End Date Picker */}
                        <div className="relative">
                            <Label htmlFor="endDate" className="sr-only">Return Date</Label>
                            <Popover>
                                <PopoverTrigger asChild>
                                    <Button
                                        variant={"outline"}
                                        className={cn(
                                            "w-full h-12 px-3 text-left font-normal bg-[#FFF9F0] border-border hover:bg-[#FFF9F0]/80 hover:text-foreground flex items-center justify-between",
                                            !endDate && "text-muted-foreground"
                                        )}
                                    >
                                        <div className="flex items-center">
                                            <CalendarIcon className="h-5 w-5 text-muted-foreground mr-2 opacity-70" />
                                            {endDate ? format(endDate, "dd-MM-yyyy") : <span>Return</span>}
                                        </div>
                                        <CalendarDays className="h-4 w-4 text-muted-foreground opacity-50" />
                                    </Button>
                                </PopoverTrigger>
                                <PopoverContent className="w-auto p-0" align="start">
                                    <Calendar
                                        mode="single"
                                        selected={endDate}
                                        onSelect={setEndDate}
                                        disabled={(date) => startDate ? date < startDate : false}
                                        initialFocus
                                        className="rounded-t-md"
                                    />
                                    {/* Custom Footer */}
                                    <div className="flex items-center justify-between px-4 pb-4 pt-0">
                                        <Button
                                            variant="ghost"
                                            size="sm"
                                            className="text-primary hover:text-primary/80 h-auto p-0 font-medium"
                                            onClick={() => handleClear(setEndDate)}
                                        >
                                            Clear
                                        </Button>
                                        <Button
                                            variant="ghost"
                                            size="sm"
                                            className="text-primary hover:text-primary/80 h-auto p-0 font-medium"
                                            onClick={() => handleToday(setEndDate)}
                                        >
                                            Today
                                        </Button>
                                    </div>
                                </PopoverContent>
                            </Popover>
                        </div>
                    </div>

                    {/* Budget Radio Buttons */}
                    <div className="mb-8">
                        <p className="text-sm font-medium text-muted-foreground mb-3 uppercase tracking-wide">
                            Budget Type
                        </p>
                        <RadioGroupWrapper
                            value={budget}
                            onValueChange={setBudget}
                            className="flex flex-wrap justify-center gap-6"
                        >
                            <div className="flex items-center space-x-2">
                                <RadioGroupItemWrapper value="student" id="student" />
                                <Label htmlFor="student" className="text-foreground cursor-pointer font-medium">Student</Label>
                            </div>
                            <div className="flex items-center space-x-2">
                                <RadioGroupItemWrapper value="family" id="family" />
                                <Label htmlFor="family" className="text-foreground cursor-pointer font-medium">Family</Label>
                            </div>
                            <div className="flex items-center space-x-2">
                                <RadioGroupItemWrapper value="luxury" id="luxury" />
                                <Label htmlFor="luxury" className="text-foreground cursor-pointer font-medium">Luxury</Label>
                            </div>
                        </RadioGroupWrapper>
                    </div>

                    {/* Search Button */}
                    <Button
                        onClick={handleSearch}
                        size="lg"
                        className="w-full md:w-auto px-12 h-14 bg-gradient-to-r from-primary to-accent hover:opacity-90 text-white font-bold text-lg rounded-xl shadow-lg transition-transform hover:scale-105 active:scale-95"
                    >
                        <Search className="mr-2 h-5 w-5" />
                        Search Routes
                    </Button>
                </div>
            </div>

            {/* Scroll Indicator */}
            <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
                <div className="w-6 h-10 border-2 border-white/50 rounded-full flex justify-center backdrop-blur-sm">
                    <div className="w-1 h-3 bg-white rounded-full mt-2" />
                </div>
            </div>
        </section>
    );
}
