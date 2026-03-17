import { motion } from "framer-motion";
import { Trophy, Award, BookOpen, Presentation, Users } from "lucide-react";

const rewards = [
  { icon: Trophy, title: "Grand Prize Pool", description: "A total prize pool of ₹1.5 Lakh to be awarded to top-performing teams." },
  { icon: Award, title: "Certificates", description: "Participation and excellence certificates for all registered attendees." },
  { icon: Presentation, title: "Exclusive Workshops", description: "Access to premium hands-on sessions with industry hardware security experts." },
  { icon: Users, title: "Networking", description: "Direct interaction and mentorship from ISEA project leads and cybersecurity veterans." },
];

const PrizesSection = () => (
  <>
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
        {rewards.map((reward, i) => (
          <motion.div
            key={reward.title}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1 }}
            className="surface-card p-8 hover:border-primary/30 transition-all group"
          >
            <reward.icon className="h-10 w-10 text-primary mb-6 group-hover:scale-110 transition-transform" />
            <h3 className="font-display font-bold text-xl text-foreground mb-3">{reward.title}</h3>
            <p className="text-muted-foreground text-sm leading-relaxed">{reward.description}</p>
          </motion.div>
        ))}
      </div>

  </>
);

export default PrizesSection;
