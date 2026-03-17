import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import AboutSection from "@/components/AboutSection";
import TopicsSection from "@/components/TopicsSection";
import PrizePoolSummary from "@/components/PrizePoolSummary";
import SponsorsSection from "@/components/SponsorsSection";
import Footer from "@/components/Footer";

const Index = () => (
  <div className="min-h-screen bg-transparent">
    <Navbar />
    <HeroSection />
    <AboutSection />
    <TopicsSection />
    <PrizePoolSummary />
    <SponsorsSection />
    <Footer />
  </div>
);

export default Index;
