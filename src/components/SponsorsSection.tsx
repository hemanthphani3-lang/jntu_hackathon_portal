import { motion } from "framer-motion";

const SponsorsSection = () => (
  <section className="py-24 bg-card/50">
    <div className="container mx-auto px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-center"
      >
        <h2 className="font-display font-bold text-3xl md:text-4xl text-foreground mb-4">
          Our <span className="text-primary">Sponsors</span>
        </h2>
        <p className="text-muted-foreground mb-12">Partnering with leading organizations in cybersecurity.</p>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-3xl mx-auto">
          {[1, 2, 3, 4].map((i) => (
            <div
              key={i}
              className="surface-card p-8 flex items-center justify-center text-muted-foreground/30 font-display font-bold text-lg"
            >
              Sponsor {i}
            </div>
          ))}
        </div>

        <p className="text-sm text-muted-foreground mt-8">
          Interested in sponsoring? <a href="/contact" className="text-primary hover:underline">Contact us</a>
        </p>
      </motion.div>
    </div>
  </section>
);

export default SponsorsSection;
