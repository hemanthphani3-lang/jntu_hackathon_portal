import { motion } from "framer-motion";

const PrizePoolSummary = () => (
  <section className="py-24 bg-background relative overflow-hidden">
    <div className="container mx-auto px-4 relative z-10">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        className="max-w-4xl mx-auto"
      >
        <img
          src="/prize-pool-banner.jpg"
          alt="ISEA JNTUK 2026 CTF Hackathon – Total Prize Pool 1.5 Lakh"
          className="w-full h-auto rounded-xl shadow-2xl object-cover"
        />
      </motion.div>
    </div>

    {/* Decorative background elements */}
    <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-64 h-64 bg-primary/10 rounded-full blur-[100px] pointer-events-none" />
    <div className="absolute top-1/2 right-1/4 -translate-y-1/2 w-64 h-64 bg-secondary/10 rounded-full blur-[100px] pointer-events-none" />
  </section>
);

export default PrizePoolSummary;
