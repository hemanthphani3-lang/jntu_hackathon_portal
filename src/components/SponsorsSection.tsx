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
          Our <span className="text-primary">Sponsor</span>
        </h2>
        <p className="text-muted-foreground mb-12">
          Proudly supported by a Government of India initiative in cybersecurity education.
        </p>

        <motion.div
          initial={{ opacity: 0, scale: 0.92 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="flex flex-col md:flex-row items-center gap-10 max-w-4xl mx-auto"
        >
          {/* Logo */}
          <div className="flex items-center justify-center shrink-0">
            <img
              src="/isea-sponsor.png"
              alt="ISEA – Information Security Education and Awareness"
              className="w-64 md:w-80 h-auto object-contain drop-shadow-2xl"
            />
          </div>

          {/* Description */}
          <div className="text-center md:text-left max-w-2xl">
            <h3 className="font-display font-bold text-xl text-foreground mb-3">
              ISEA — Information Security Education &amp; Awareness
            </h3>
            <p className="text-muted-foreground text-base leading-relaxed">
              ISEA is a flagship project of the <span className="text-foreground font-medium">Ministry of Electronics &amp; Information Technology (MeitY)</span>, 
              Government of India. Its mission is to create awareness and build capacity in the field of Information Security 
              across academic institutions, government bodies, and the general public. 
              The ISEA JNTUK initiative under <span className="text-foreground font-medium">Phase III</span> brings this vision to life through 
              hands-on bootcamps, CTF hackathons, and cybersecurity training — empowering students to 
              become the cyber defenders of tomorrow.
            </p>
          </div>
        </motion.div>
      </motion.div>
    </div>
  </section>
);

export default SponsorsSection;
