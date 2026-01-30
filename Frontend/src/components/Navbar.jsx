import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Menu, Train, User } from "lucide-react";
import { cn } from "@/lib/utils";

export function Navbar({ className, user, onLogout }) {
    const [isOpen, setIsOpen] = useState(false);

    const navLinks = [
        { name: "Home", href: "/" },
        { name: "Features", href: "#features" },
        { name: "Popular Routes", href: "#routes" },
        ...(user ? [{ name: "My Trips", href: "/my-trips" }] : []),
    ];

    const getDisplayName = (user) => {
        if (!user) return "";
        return user.name || user.email || "Traveler";
    };

    return (
        <nav className={cn("border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50", className)}>
            <div className="container mx-auto px-4 h-16 flex items-center justify-between">
                {/* Logo */}
                <Link to="/" className="flex items-center gap-2 font-bold text-xl text-primary">
                    <Train className="h-6 w-6" />
                    <span>TripLens</span>
                </Link>

                {/* Desktop Navigation */}
                <div className="hidden md:flex items-center gap-8">
                    <div className="flex items-center gap-6">
                        {navLinks.map((link) => (
                            link.href.startsWith('/') ? (
                                <Link
                                    key={link.name}
                                    to={link.href}
                                    className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors"
                                >
                                    {link.name}
                                </Link>
                            ) : (
                                <a
                                    key={link.name}
                                    href={link.href}
                                    className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors"
                                    onClick={(e) => {
                                        if (link.href.startsWith('#')) {
                                            e.preventDefault();
                                            document.querySelector(link.href)?.scrollIntoView({ behavior: 'smooth' });
                                        }
                                    }}
                                >
                                    {link.name}
                                </a>
                            )
                        ))}
                    </div>
                    <div className="flex items-center gap-4">
                        {user ? (
                            <div className="flex items-center gap-4">
                                <span className="text-sm font-medium flex items-center gap-2">
                                    <User className="h-4 w-4" />
                                    Welcome, {getDisplayName(user)}
                                </span>
                                <Button variant="ghost" size="sm" onClick={onLogout}>
                                    Logout
                                </Button>
                            </div>
                        ) : (
                            <>
                                <Link to="/login">
                                    <Button variant="ghost" size="sm">
                                        Log in
                                    </Button>
                                </Link>
                                <Link to="/signup">
                                    <Button size="sm">Sign up</Button>
                                </Link>
                            </>
                        )}
                    </div>
                </div>

                {/* Mobile Navigation */}
                <Sheet open={isOpen} onOpenChange={setIsOpen}>
                    <SheetTrigger asChild className="md:hidden">
                        <Button variant="ghost" size="icon">
                            <Menu className="h-5 w-5" />
                            <span className="sr-only">Toggle menu</span>
                        </Button>
                    </SheetTrigger>
                    <SheetContent side="right">
                        <div className="flex flex-col gap-6 mt-6">
                            <div className="flex flex-col gap-4">
                                {navLinks.map((link) => (
                                    link.href.startsWith('/') ? (
                                        <Link
                                            key={link.name}
                                            to={link.href}
                                            className="text-lg font-medium hover:text-primary transition-colors"
                                            onClick={() => setIsOpen(false)}
                                        >
                                            {link.name}
                                        </Link>
                                    ) : (
                                        <a
                                            key={link.name}
                                            href={link.href}
                                            className="text-lg font-medium hover:text-primary transition-colors"
                                            onClick={() => setIsOpen(false)}
                                        >
                                            {link.name}
                                        </a>
                                    )
                                ))}
                            </div>
                            <div className="flex flex-col gap-3 mt-4">
                                {user ? (
                                    <>
                                        <div className="text-sm font-medium flex items-center gap-2 mb-2">
                                            <User className="h-4 w-4" />
                                            Welcome, {getDisplayName(user)}
                                        </div>
                                        <Button variant="outline" className="w-full" onClick={() => { onLogout(); setIsOpen(false); }}>
                                            Logout
                                        </Button>
                                    </>
                                ) : (
                                    <>
                                        <Link to="/login" onClick={() => setIsOpen(false)}>
                                            <Button variant="outline" className="w-full">
                                                Log in
                                            </Button>
                                        </Link>
                                        <Link to="/signup" onClick={() => setIsOpen(false)}>
                                            <Button className="w-full">Sign up</Button>
                                        </Link>
                                    </>
                                )}
                            </div>
                        </div>
                    </SheetContent>
                </Sheet>
            </div>
        </nav>
    );
}

export default Navbar;
