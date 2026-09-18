import Navbar from "./components/Navbar.jsx";
import Hero from "./components/Hero.jsx";
import SocialProof from "./components/SocialProof.jsx";
import Features from "./components/Features.jsx";
import HowItWorks from "./components/HowItWorks.jsx";
import AnalyticsPreview from "./components/AnalyticsPreview.jsx";
import Pricing from "./components/Pricing";
import FinalCTA from "./components/FinalCTA";
import Footer from "./components/Footer";

import "./Landing.css";

const Landing = () => {

    return (
        <div className="landing-page">

            <Navbar />

            <main>

                <Hero />

                <SocialProof />

                <Features />

                <HowItWorks />

                <AnalyticsPreview />

                <Pricing />

                <FinalCTA />

            </main>

            <Footer />

        </div>
    );
};

export default Landing;