import { Train } from "lucide-react"
import { Link } from "react-router-dom"

export function Footer() {
    return (
        <footer className="bg-muted py-12">
            <div className="container px-4 md:px-6">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                    <div className="space-y-4">
                        <Link to="/" className="flex items-center gap-2 font-bold text-xl text-primary">
                            <Train className="h-6 w-6" />
                            <span>TripLens</span>
                        </Link>
                        <p className="text-muted-foreground text-sm">
                            India&apos;s smartest travel companion. Compare, discover, and explore with confidence.
                        </p>
                    </div>

                    <div>
                        <h3 className="font-semibold mb-4">Quick Links</h3>
                        <ul className="space-y-2 text-sm text-muted-foreground">
                            <li><Link to="/" className="hover:text-primary transition-colors">Home</Link></li>
                            <li><Link to="#routes" className="hover:text-primary transition-colors">Popular Routes</Link></li>
                            <li><Link to="#features" className="hover:text-primary transition-colors">Hidden Gems</Link></li>
                            <li><Link to="/budget" className="hover:text-primary transition-colors">Budget Planner</Link></li>
                        </ul>
                    </div>

                    <div>
                        <h3 className="font-semibold mb-4">Support</h3>
                        <ul className="space-y-2 text-sm text-muted-foreground">
                            <li><Link to="/faqs" className="hover:text-primary transition-colors">FAQs</Link></li>
                            <li><Link to="/contact" className="hover:text-primary transition-colors">Contact Us</Link></li>
                            <li><Link to="/privacy" className="hover:text-primary transition-colors">Privacy Policy</Link></li>
                            <li><Link to="/terms" className="hover:text-primary transition-colors">Terms of Service</Link></li>
                        </ul>
                    </div>

                    <div>
                        <h3 className="font-semibold mb-4">Contact</h3>
                        <ul className="space-y-2 text-sm text-muted-foreground">
                            <li>Mumbai, India</li>
                            <li><a href="mailto:hello@triplens.in" className="hover:text-primary transition-colors">hello@triplens.in</a></li>
                            <li>+91 123 456 7890</li>
                        </ul>
                    </div>
                </div>

                <div className="border-t border-border mt-12 pt-8 text-center text-sm text-muted-foreground">
                    <p>&copy; {new Date().getFullYear()} TripLens. All rights reserved. Made with love in India.</p>
                </div>
            </div>
        </footer>
    )
}
