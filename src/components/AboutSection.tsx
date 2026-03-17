import { motion } from "framer-motion";
import { Shield, Cpu, Lock, Wifi } from "lucide-react";

const features = [
  { icon: Shield, title: "ISEA Project Phase-III", desc: "Government of India initiative to enhance cybersecurity awareness and build capacity in educational institutions." },
  { icon: Shield, title: "Cyber Security", desc: "Explore network security, penetration testing, and advanced exploitation techniques in a safe environment." },
  { icon: Lock, title: "Ethical Hacking", desc: "Learn penetration testing, vulnerability assessment, and ethical hacking methodologies hands-on." },
  { icon: Wifi, title: "Wireless Security", desc: "Understand wireless protocols, attack vectors, and defense mechanisms for modern networks." },
];

const AboutSection = () => (
  <section className="py-24 bg-card/50">
    <div className="container mx-auto px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-center mb-16"
      >
        <h2 className="font-display font-bold text-3xl md:text-4xl text-foreground mb-4">
          About the <span className="text-primary">Event</span>
        </h2>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          A three-day intensive bootcamp and hackathon bringing together aspiring cybersecurity professionals
          for hands-on training and competitive challenges.
        </p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {features.map((f, i) => (
          <motion.div
            key={f.title}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1 }}
            className="surface-card p-6 hover:border-primary/30 transition-colors group"
          >
            <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
              <f.icon className="h-6 w-6 text-primary" />
            </div>
            <h3 className="font-display font-semibold text-foreground mb-2">{f.title}</h3>
            <p className="text-sm text-muted-foreground">{f.desc}</p>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

export default AboutSection;
