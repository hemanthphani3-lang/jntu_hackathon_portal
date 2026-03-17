import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import PrizesSection from "@/components/PrizesSection";
import { motion } from "framer-motion";
import { Trophy } from "lucide-react";

const Prizes = () => (
  <div className="min-h-screen bg-transparent">
    <Navbar />
    <div className="pt-24 pb-16">
      <section className="container mx-auto px-4">
        <motion.div 
          initial={{ opacity: 0, y: 20 }} 
          animate={{ opacity: 1, y: 0 }} 
          className="text-center mb-12"
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-primary/30 bg-primary/5 mb-4">
            <Trophy className="h-4 w-4 text-primary" />
            <span className="text-sm font-medium text-primary">Contest Rewards</span>
          </div>
          <h1 className="font-display font-bold text-4xl md:text-6xl lg:text-7xl text-foreground mb-6 leading-tight">
            Total Prize Pool <br />
            <span className="text-gradient-cyber text-5xl md:text-7xl lg:text-8xl">₹1,50,000</span>
          </h1>
          <p className="text-muted-foreground max-w-2xl mx-auto text-lg md:text-xl">
            To be distributed among the top winners and runners-up of the ISEA JNTUK - 2026 Hackathon.
          </p>
        </motion.div>
        
        <PrizesSection />
      </section>
    </div>
    <Footer />
  </div>
);

export default Prizes;
