import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { motion } from "framer-motion";
import { Mic2, User } from "lucide-react";

const speakers = [
  {
    name: "Mr. P. Lokesh",
    details: "CEO (Gen-AI / Drone Tech) LAKSHYA RYTHU DRONES AND TECHNOLOGIES",
    image: "/P Lokesh.jpeg"
  },
  {
    name: "Mr. B. Srinivas",
    details: "E-Governance and Academic Advisor, Former Chief Information Security Officer (CISO), Chief Financial Innovation Officer and Innovation Officer and Information and Cyber Security Researcher",
    image: "/B Srinivas.jpeg"
  },
  {
    name: "Mr. K. Prem Sai",
    details: "K. Prem Sai – CEO (Drone Tech) kelvomex Pvt Ltd",
    image: "/K. Prem Sai.jpeg"
  },
  {
    name: "Mr. K. Yogi",
    details: "Yogi K – CFO (IoT) kelvomex Pvt Ltd",
    image: "/K. Yogi.jpeg"
  },
  {
    name: "Mr. G. Bharath Kumar",
    details: "CEO LYFAUX Technology Pvt Ltd",
    image: "/G.Bharath Kumar.jpeg"
  },
  {
    name: "Dr. K. V Ramana",
    details: "Senior Professor of CSE & Principal Investigator ISEA Project Phase - III",
    image: "/Dr. K.V. Ramana.jpeg"
  }
];

const Speakers = () => (
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
            <Mic2 className="h-4 w-4 text-primary" />
            <span className="text-sm font-medium text-primary">Guest Speakers</span>
          </div>
          <h1 className="font-display font-bold text-4xl md:text-6xl lg:text-7xl text-foreground mb-6 leading-tight">
            Meet Our <br />
            <span className="text-gradient-cyber text-5xl md:text-7xl lg:text-8xl">Speakers</span>
          </h1>
          <p className="text-muted-foreground max-w-2xl mx-auto text-lg md:text-xl">
            Learn from industry leaders and cybersecurity experts who will be sharing their insights and experiences at ISEA JNTUK - 2026.
          </p>
        </motion.div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {speakers.map((speaker, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="surface-card p-8 flex flex-col items-center text-center group hover:border-primary/50 transition-all duration-300"
            >
              <div className="relative group/img mb-8">
                <div className="absolute -inset-1.5 bg-gradient-to-r from-primary to-secondary rounded-[2rem] blur opacity-20 group-hover/img:opacity-40 transition duration-500"></div>
                <div className="relative w-48 h-48 rounded-[2rem] overflow-hidden bg-card/50 border border-primary/20 flex items-center justify-center p-2">
                  {speaker.image ? (
                    <img 
                      src={speaker.image} 
                      alt={speaker.name} 
                      className="w-full h-full object-contain transform transition-transform duration-700 group-hover:scale-105" 
                    />
                  ) : (
                    <User className="h-20 w-20 text-muted-foreground/30" />
                  )}
                </div>
              </div>
              
              <div className="flex flex-col flex-grow">
                <h3 className="text-2xl font-bold text-foreground mb-2 group-hover:text-primary transition-colors duration-300">
                  {speaker.name}
                </h3>
                <div className="h-1 w-10 bg-primary/30 mx-auto mb-6 rounded-full group-hover:w-16 transition-all duration-300"></div>
                <p className="text-muted-foreground text-sm leading-relaxed max-w-xs mx-auto italic">
                  "{speaker.details}"
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </section>
    </div>
    <Footer />
  </div>
);

export default Speakers;
