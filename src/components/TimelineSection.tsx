import { motion } from "framer-motion";

const timeline = [
  { date: "March 23", title: "Bootcamp Day 1", items: ["Inauguration & Keynote", "Networking Fundamentals", "Virtual Lab Setup", "Kali Linux Introduction"] },
  { date: "March 24", title: "Bootcamp Day 2 + Hackathon Start", items: ["System Hacking Workshop", "Malware Analysis", "Steganography Lab", "CTF Hackathon Kickoff"] },
  { date: "March 25", title: "Bootcamp Day 3 + Hackathon Finals", items: ["Mobile & Wireless Hacking", "Cyber Laws Session", "CTF Final Rounds", "Valedictory Ceremony"] },
];

const TimelineSection = () => (
  <section className="py-24 bg-card/50">
    <div className="container mx-auto px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-center mb-16"
      >
        <h2 className="font-display font-bold text-3xl md:text-4xl text-foreground mb-4">
          Event <span className="text-primary">Timeline</span>
        </h2>
      </motion.div>

      <div className="max-w-3xl mx-auto space-y-8">
        {timeline.map((day, i) => (
          <motion.div
            key={day.date}
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.15 }}
            className="surface-card p-6 relative border-l-2 border-primary"
          >
            <div className="absolute -left-[9px] top-6 w-4 h-4 rounded-full bg-primary border-2 border-background" />
            <div className="flex flex-col sm:flex-row sm:items-center gap-2 mb-3">
              <span className="font-display font-bold text-primary">{day.date}</span>
              <span className="text-foreground font-display font-semibold">{day.title}</span>
            </div>
            <ul className="space-y-1.5">
              {day.items.map((item) => (
                <li key={item} className="text-sm text-muted-foreground flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-muted-foreground/40" />
                  {item}
                </li>
              ))}
            </ul>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

export default TimelineSection;
