import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { motion } from "framer-motion";
import { User, Award } from "lucide-react";

const coordinator = {
  name: "Program Coordinator",
  details: "Program Coordinator, ISEA JNTUK",
  description: "Information about the program coordinator will be updated soon. They are responsible for overseeing the successful implementation and execution of the ISEA JNTUK Bootcamp and Hackathon.",
  image: null // Placeholder for now
};

const ProgramCoordinator = () => (
  <div className="min-h-screen bg-transparent">
    <Navbar />
    <div className="pt-32 pb-16">
      <section className="container mx-auto px-4">
        <motion.div 
          initial={{ opacity: 0, y: 20 }} 
          animate={{ opacity: 1, y: 0 }} 
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-secondary/30 bg-secondary/5 mb-6">
            <Award className="h-4 w-4 text-secondary" />
            <span className="text-sm font-medium text-secondary">Leadership</span>
          </div>
          <h1 className="font-display font-bold text-4xl md:text-5xl lg:text-7xl text-foreground mb-6 leading-tight">
            Program <span className="text-gradient-cyber">Coordinator</span>
          </h1>
        </motion.div>
        
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.1, duration: 0.5 }}
            className="surface-card p-8 md:p-16 flex flex-col md:flex-row items-center md:items-start gap-12 text-center md:text-left group hover:border-secondary/50 transition-all duration-300 relative overflow-hidden"
          >
            {/* Background Glow */}
            <div className="absolute top-0 right-0 -mr-32 -mt-32 w-64 h-64 rounded-full bg-secondary/10 blur-3xl group-hover:bg-secondary/20 transition-colors duration-500"></div>

            {/* Profile Image - Premium Squircle */}
            <div className="relative group/img shrink-0">
              <div className="absolute -inset-2 bg-gradient-to-r from-primary via-secondary to-primary rounded-[3rem] blur opacity-30 group-hover/img:opacity-60 transition duration-500 animate-pulse"></div>
              <div className="relative w-56 h-56 md:w-72 md:h-72 rounded-[3rem] overflow-hidden bg-card border border-border/50 flex items-center justify-center p-3 z-10">
                {coordinator.image ? (
                  <img 
                    src={coordinator.image} 
                    alt={coordinator.name} 
                    className="w-full h-full object-contain transform transition-transform duration-700 group-hover:scale-105 rounded-[2.5rem]" 
                  />
                ) : (
                  <User className="h-24 w-24 text-muted-foreground/30" />
                )}
              </div>
            </div>
            
            {/* Coordinator Details */}
            <div className="flex flex-col flex-grow justify-center pt-4 md:pt-8 z-10">
              <h3 className="text-3xl md:text-4xl font-bold text-foreground mb-3 group-hover:text-secondary transition-colors duration-300">
                {coordinator.name}
              </h3>
              <div className="h-1 w-16 bg-gradient-to-r from-primary to-secondary mb-6 rounded-full group-hover:w-24 transition-all duration-300 md:mx-0 mx-auto"></div>
              <p className="text-xl font-medium text-primary mb-6">
                {coordinator.details}
              </p>
              <p className="text-muted-foreground text-lg leading-relaxed">
                {coordinator.description}
              </p>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
    <Footer />
  </div>
);

export default ProgramCoordinator;
