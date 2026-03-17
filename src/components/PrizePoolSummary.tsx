import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

const PrizePoolSummary = () => (
  <section className="py-24 bg-background relative overflow-hidden">
    <div className="container mx-auto px-4 relative z-10">
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        className="max-w-4xl mx-auto surface-card p-12 text-center border-primary/20 bg-gradient-to-br from-primary/10 via-background to-secondary/10"
      >
        <div className="flex justify-center mb-6">
          <img src="/hackathon-logo.png" alt="Hackathon Logo" className="w-24 md:w-32 h-auto opacity-80" />
        </div>
        <h2 className="text-2xl font-display font-bold text-foreground mb-4 uppercase tracking-wider">Total Prize Pool</h2>
        <motion.p 
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-6xl md:text-8xl font-display font-bold text-gradient-cyber mb-8"
        >
          ₹1,50,000
        </motion.p>
        <p className="text-muted-foreground text-lg mb-10 max-w-2xl mx-auto">
          Reward for technical excellence in the ISEA JNTUK - 2026 Hackathon. Join us and prove your skills to win big.
        </p>
        <div className="flex flex-wrap justify-center gap-4">
          <Link to="/prizes">
            <Button variant="cyber" size="lg">View All Rewards</Button>
          </Link>
        </div>
      </motion.div>
    </div>
    
    {/* Decorative background elements */}
    <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-64 h-64 bg-primary/10 rounded-full blur-[100px] pointer-events-none" />
    <div className="absolute top-1/2 right-1/4 -translate-y-1/2 w-64 h-64 bg-secondary/10 rounded-full blur-[100px] pointer-events-none" />
  </section>
);

export default PrizePoolSummary;
