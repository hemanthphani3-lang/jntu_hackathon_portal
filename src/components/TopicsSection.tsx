import { motion } from "framer-motion";
import { Terminal, Network, Bug, Smartphone, Radio, Scale, Eye, Database, ShieldAlert } from "lucide-react";

const topics = [
  { icon: Network, name: "Networking Basics" },
  { icon: Terminal, name: "Virtual Labs" },
  { icon: Database, name: "Kali Linux" },
  { icon: Bug, name: "System Hacking" },
  { icon: ShieldAlert, name: "Malware Analysis" },
  { icon: Eye, name: "Steganography" },
  { icon: Smartphone, name: "Mobile Hacking" },
  { icon: Radio, name: "Wireless Attacks" },
  { icon: Scale, name: "Cyber Laws" },
];

const TopicsSection = () => (
  <section className="py-24">
    <div className="container mx-auto px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-center mb-16"
      >
        <h2 className="font-display font-bold text-3xl md:text-4xl text-foreground mb-4">
          Topics <span className="text-gradient-cyber">Covered</span>
        </h2>
        <p className="text-muted-foreground max-w-xl mx-auto">
          Comprehensive cybersecurity training modules delivered by industry experts.
        </p>
      </motion.div>

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-3 gap-4 max-w-3xl mx-auto">
        {topics.map((t, i) => (
          <motion.div
            key={t.name}
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.05 }}
            className="surface-card p-4 flex items-center gap-3 hover:border-primary/30 transition-colors"
          >
            <t.icon className="h-5 w-5 text-primary shrink-0" />
            <span className="text-sm font-medium text-foreground">{t.name}</span>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

export default TopicsSection;
