import { HeroSection } from "@/components/HeroSection";
import { FeaturesSection } from "@/components/FeaturesSection";
import { PopularRoutesSection } from "@/components/PopularRoutesSection";
import { Footer } from "@/components/Footer";
import { Navbar } from "@/components/Navbar";

const LandingPage = ({ user, onLogout }) => {
    return (
        <div className="landing-page min-h-screen flex flex-col">
            <Navbar user={user} onLogout={onLogout} />
            <main className="flex-1">
                <HeroSection />
                <FeaturesSection />
                <PopularRoutesSection />
            </main>
            <Footer />
        </div>
    );
};

export default LandingPage;
