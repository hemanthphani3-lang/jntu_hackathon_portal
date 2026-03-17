import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Link, useNavigate } from "react-router-dom";
import { Shield, Calendar, MapPin, ChevronRight, LogIn } from "lucide-react";
import CountdownTimer from "./CountdownTimer";
import { useAuth } from "@/hooks/use-auth";
import { useToast } from "@/hooks/use-toast";

const HeroSection = () => {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();
  const { toast } = useToast();

  const handleRegisterClick = (e: React.MouseEvent) => {
    if (!isAuthenticated) {
      e.preventDefault();
      toast({
        title: "Authentication Required",
        description: "Please login first to register for events.",
      });
      navigate("/login");
    }
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">

      <div className="container mx-auto px-4 relative z-10 text-center pt-24 md:pt-32">
        {/* Official Logos Container */}
        <div className="relative md:absolute md:top-0 left-0 right-0 z-20 flex flex-wrap justify-center md:justify-between items-center gap-6 md:gap-0 max-w-7xl mx-auto mb-10 md:mb-0">
          {/* Left Logos (MeitY & ISEA) */}
          <div className="flex items-center gap-4 md:gap-5">
            <img
              src="/meity-logo.png"
              alt="MeitY"
              className="h-10 sm:h-12 md:h-16 lg:h-20 w-auto object-contain brightness-110 drop-shadow-lg"
            />
            <img
              src="/isea-logo.jpg"
              alt="ISEA"
              className="h-10 sm:h-12 md:h-16 lg:h-20 w-auto object-contain brightness-110 drop-shadow-lg rounded-full"
            />
          </div>

          {/* Right Logo (JNTUK) */}
          <div className="flex items-center">
            <img
              src="/jntuk-logo.png"
              alt="JNTUK"
              className="h-10 sm:h-12 md:h-16 lg:h-20 w-auto object-contain brightness-110 drop-shadow-lg"
            />
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="flex flex-col items-center"
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-primary/30 bg-primary/5 mb-6">
            <span className="w-2 h-2 rounded-full bg-terminal-green animate-pulse-glow" />
            <span className="text-sm font-medium text-primary uppercase tracking-wider">Registration Open</span>
          </div>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="font-display font-bold text-4xl sm:text-5xl md:text-6xl lg:text-7xl mb-4 leading-tight"
        >
          <span className="text-foreground">Next-Gen Cyber</span>
          <br />
          <span className="text-gradient-cyber">Security Bootcamp</span>
          <br />
          <span className="text-foreground">& Hackathon <span className="text-primary">2026</span></span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="text-muted-foreground text-lg md:text-xl max-w-2xl mx-auto mb-6"
        >
          Under <span className="text-foreground font-semibold">ISEA Project Phase-III</span> — Organized at JNTUK
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="flex flex-wrap items-center justify-center gap-6 text-sm text-muted-foreground mb-8"
        >
          <div className="flex items-center gap-2">
            <Calendar className="h-4 w-4 text-primary" />
            <span>Bootcamp: 23–25 March 2026</span>
          </div>
          <div className="flex items-center gap-2">
            <Shield className="h-4 w-4 text-secondary" />
            <span>Hackathon: 24–25 March 2026</span>
          </div>
          <div className="flex items-center gap-2">
            <MapPin className="h-4 w-4 text-terminal-green" />
            <span>Bootcamp: Alumni Auditorium | Hackathon: Ambedkar Library</span>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="mb-12"
        >
          <CountdownTimer targetDate="2026-03-23T09:00:00" />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="flex flex-wrap justify-center gap-4"
        >
          <Link to="/register" onClick={handleRegisterClick}>
            <Button variant="cyber" size="lg" className="text-base px-8">
              {isAuthenticated ? "Register Now" : "Login to Register"} 
              {isAuthenticated ? <ChevronRight className="ml-1 h-5 w-5" /> : <LogIn className="ml-2 h-5 w-5" />}
            </Button>
          </Link>
          <Link to="/programs">
            <Button variant="cyber-outline" size="lg" className="text-base px-8">
              View Programs
            </Button>
          </Link>
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;
