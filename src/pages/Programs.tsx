import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import ScanningOverlay from "@/components/ScanningOverlay";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { motion } from "framer-motion";
import { Terminal, Shield, Network, Bug, Smartphone, Radio, Scale, Eye, Database, ShieldAlert, Flag, Users, Clock, AlertTriangle } from "lucide-react";
import { Button } from "@/components/ui/button";

const bootcampTopics = [
  { icon: Network, name: "Networking Basics", desc: "TCP/IP, OSI model, packet analysis, network scanning and enumeration." },
  { icon: Terminal, name: "Virtual Labs", desc: "Setting up penetration testing environments with VMs and containers." },
  { icon: Database, name: "Kali Linux", desc: "Essential tools: Nmap, Wireshark, Metasploit, Burp Suite and more." },
  { icon: Bug, name: "System Hacking", desc: "Exploitation techniques, privilege escalation, and post-exploitation." },
  { icon: ShieldAlert, name: "Malware Analysis", desc: "Static and dynamic malware analysis, reverse engineering basics." },
  { icon: Eye, name: "Steganography", desc: "Hidden data detection, image and audio steganography techniques." },
  { icon: Smartphone, name: "Mobile Hacking", desc: "Android/iOS vulnerabilities, mobile app penetration testing." },
  { icon: Radio, name: "Wireless Attacks", desc: "WiFi cracking, Bluetooth vulnerabilities, RF exploitation." },
  { icon: Scale, name: "Cyber Laws", desc: "IT Act, GDPR, ethical hacking regulations and compliance." },
];

const hackathonRules = [
  "Teams must consist of 2-3 members from JNTUK.",
  "Each participant can join only one team.",
  "Teams must register before the hackathon deadline.",
  "All challenges must be solved ethically — no external attacks.",
  "Internet access is allowed for reference only, not for solution sharing.",
  "Decisions of the judges are final and binding.",
  "Teams must present their approach during the final evaluation.",
];

const Programs = () => {
  const navigate = useNavigate();
  const [showHackathonScan, setShowHackathonScan] = useState(false);
  const [showBootcampScan, setShowBootcampScan] = useState(false);

  return (
    <div className="min-h-screen bg-transparent">
      <ScanningOverlay 
        isVisible={showHackathonScan} 
        logoSrc="/hackathon-logo.png" 
        onComplete={() => navigate("/register")} 
        title="Accessing Hackathon Infrastructure..."
      />
      <ScanningOverlay 
        isVisible={showBootcampScan} 
        logoSrc="/bootcamp-logo.png" 
        onComplete={() => navigate("/register")} 
        title="Synchronizing Bootcamp Curricula..."
        variant="training"
      />
      <Navbar />
    <div className="pt-24 pb-16">
      {/* Bootcamp Section */}
      <section className="container mx-auto px-4 mb-24">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-primary/30 bg-primary/5 mb-4">
            <img src="/bootcamp-logo.png" alt="Bootcamp Logo" className="h-5 w-5 object-contain" />
            <span className="text-sm font-medium text-primary">3-Day Training</span>
          </div>
          <h1 className="font-display font-bold text-4xl md:text-5xl text-foreground mb-4">
            Cybersecurity <span className="text-primary">Bootcamp</span>
          </h1>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Hands-on cybersecurity training covering the full spectrum of offensive and defensive security. Limited to 200 participants.
          </p>
          <p className="text-primary font-bold mt-2">Venue: Alumni Auditorium</p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {bootcampTopics.map((t, i) => (
            <motion.div
              key={t.name}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
              className="surface-card p-6 hover:border-primary/30 transition-colors"
            >
              <t.icon className="h-8 w-8 text-primary mb-3" />
              <h3 className="font-display font-semibold text-foreground mb-2">{t.name}</h3>
              <p className="text-sm text-muted-foreground">{t.desc}</p>
            </motion.div>
          ))}
        </div>

        <div className="text-center mt-10">
          <Button variant="cyber" size="lg" onClick={() => setShowBootcampScan(true)}>Register for Bootcamp</Button>
        </div>
      </section>

      {/* Hackathon Section */}
      <section className="container mx-auto px-4">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-secondary/30 bg-secondary/5 mb-4">
            <img src="/hackathon-logo.png" alt="Hackathon Logo" className="h-5 w-5 object-contain" />
            <span className="text-sm font-medium text-secondary">Capture The Flag</span>
          </div>
          <h1 className="font-display font-bold text-4xl md:text-5xl text-foreground mb-4">
            CTF <span className="text-gradient-cyber">Hackathon</span>
          </h1>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            A competitive Capture The Flag event focused on cyber security and advanced exploitation techniques. Form your team and prove your skills.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto mb-12">
          <div className="surface-card p-6 text-center border-secondary/20">
            <Users className="h-8 w-8 text-secondary mx-auto mb-3" />
            <h3 className="font-display font-semibold text-foreground mb-1">Team Size</h3>
            <p className="text-muted-foreground text-sm">2-3 Members per team</p>
          </div>
          <div className="surface-card p-6 text-center border-secondary/20">
            <Clock className="h-8 w-8 text-secondary mx-auto mb-3" />
            <h3 className="font-display font-semibold text-foreground mb-1">Duration</h3>
            <p className="text-muted-foreground text-sm">48 Hours (24-25 March 2026)</p>
          </div>
          <div className="surface-card p-6 text-center border-secondary/20">
            <Flag className="h-8 w-8 text-secondary mx-auto mb-3" />
            <h3 className="font-display font-semibold text-foreground mb-1">Venue</h3>
            <p className="text-muted-foreground text-sm">Dr.Br.Ambedkar Library</p>
          </div>
        </div>

        {/* Rules */}
        <div className="max-w-2xl mx-auto">
          <h3 className="font-display font-bold text-xl text-foreground mb-4">Rules & Guidelines</h3>
          <div className="surface-card p-6 space-y-3">
            {hackathonRules.map((rule, i) => (
              <div key={i} className="flex items-start gap-3">
                <span className="font-display font-bold text-primary text-sm mt-0.5">{String(i + 1).padStart(2, "0")}</span>
                <p className="text-sm text-muted-foreground">{rule}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="text-center mt-10">
          <Button variant="cyber-purple" size="lg" onClick={() => setShowHackathonScan(true)}>Register for Hackathon</Button>
        </div>
      </section>
    </div>
    <Footer />
  </div>
  );
};

export default Programs;
