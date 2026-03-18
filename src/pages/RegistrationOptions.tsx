import { useNavigate, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import ScanningOverlay from "@/components/ScanningOverlay";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { motion } from "framer-motion";
import { Shield, Flag, ArrowRight, Eye, User, Users as UsersIcon, Mail, Phone, Hash, FileText, MapPin } from "lucide-react";
import { useAuth } from "@/hooks/use-auth";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { useEffect } from "react";
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle, 
  DialogDescription,
} from "@/components/ui/dialog";

const RegistrationOptions = () => {
  const navigate = useNavigate();
  const [showHackathonScan, setShowHackathonScan] = useState(false);
  const [showBootcampScan, setShowBootcampScan] = useState(false);
  const [bootcampReg, setBootcampReg] = useState<any>(null);
  const [hackathonReg, setHackathonReg] = useState<any>(null);
  const [isDetailsOpen, setIsDetailsOpen] = useState(false);
  const [viewingReg, setViewingReg] = useState<any>(null);
  const [viewingType, setViewingType] = useState<"bootcamp" | "hackathon">("bootcamp");
  
  const { isAuthenticated, user } = useAuth();
  const { toast } = useToast();

  const [isHackathonFormOpen, setIsHackathonFormOpen] = useState(false);
  const [isBootcampFormOpen, setIsBootcampFormOpen] = useState(false);

  const [hackathonData, setHackathonData] = useState({
    team_name: "",
    team_lead_name: "",
    team_lead_roll: "",
    team_lead_email: user?.email || "",
    member2_name: "",
    member2_roll: "",
    member2_email: "",
    member3_name: "",
    member3_roll: "",
    member3_email: ""
  });

  const [bootcampData, setBootcampData] = useState({
    full_name: "",
    roll_number: "",
    phone: "",
    course: "",
    department: ""
  });

  useEffect(() => {
    if (user?.email) {
      setHackathonData(prev => ({ ...prev, team_lead_email: user.email }));
    }
  }, [user?.email]);

  useEffect(() => {
    if (isAuthenticated && user?.email) {
      checkExistingRegistrations();
    }
  }, [isAuthenticated, user?.email]);

  const checkExistingRegistrations = async () => {
    try {
      const email = user?.email;
      if (!email) return;

      const { data, error } = await (supabase as any)
        .from('registrations')
        .select('*')
        .or(`email.eq.${email},team_lead_email.eq.${email},member2_email.eq.${email},member3_email.eq.${email}`);

      if (error) throw error;
      
      if (data) {
        setBootcampReg(data.find((r: any) => r.intent === 'bootcamp'));
        setHackathonReg(data.find((r: any) => r.intent === 'hackathon'));
      }
    } catch (error: any) {
      console.error("Error checking registrations:", error.message);
    }
  };

  const handleHackathonClick = () => {
    if (!isAuthenticated) {
      toast({
        title: "Authentication Required",
        description: "Please login first to register for the CTF Hackathon.",
      });
      navigate("/login");
      return;
    }
    
    if (hackathonReg) {
      setViewingReg(hackathonReg);
      setViewingType("hackathon");
      setIsDetailsOpen(true);
      return;
    }
    
    setShowHackathonScan(true);
  };

  const handleBootcampClick = () => {
    if (!isAuthenticated) {
      toast({
        title: "Authentication Required",
        description: "Please login first to register for the Cybersecurity Bootcamp.",
      });
      navigate("/login");
      return;
    }

    if (bootcampReg) {
      setViewingReg(bootcampReg);
      setViewingType("bootcamp");
      setIsDetailsOpen(true);
      return;
    }

    setShowBootcampScan(true);
  };

  return (
    <div className="min-h-screen bg-transparent">
      <ScanningOverlay 
        isVisible={showHackathonScan} 
        logoSrc="/hackathon-logo.png" 
        onComplete={() => {
          setShowHackathonScan(false);
          setIsHackathonFormOpen(true);
        }} 
        title="Validating Hackathon ID..."
      />
      <ScanningOverlay 
        isVisible={showBootcampScan} 
        logoSrc="/bootcamp-logo.png" 
        onComplete={() => {
          setShowBootcampScan(false);
          setIsBootcampFormOpen(true);
        }} 
        title="Initializing Bootcamp Uplink..."
        variant="training"
      />
      <Navbar />
      <div className="pt-24 pb-16 container mx-auto px-4">
        <motion.div 
          initial={{ opacity: 0, y: 20 }} 
          animate={{ opacity: 1, y: 0 }} 
          className="max-w-4xl mx-auto text-center mb-12"
        >
          <h1 className="font-display font-bold text-4xl md:text-5xl text-foreground mb-4">
            Choose Your <span className="text-primary">Path</span>
          </h1>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Select the event you would like to register for. You can participate in both!
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {/* Bootcamp Card */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 }}
            className="surface-card p-8 hover:border-primary/50 transition-all group flex flex-col justify-between"
          >
            <div>
              <div className="h-16 w-16 bg-primary/10 rounded-2xl flex items-center justify-center mb-6 border border-primary/20 group-hover:scale-110 transition-transform">
                <img src="/bootcamp-logo.png" alt="Bootcamp Logo" className="h-10 w-10 object-contain opacity-80 group-hover:opacity-100 transition-opacity" />
              </div>
              <h2 className="font-display font-bold text-2xl text-foreground mb-4 text-left">Cybersecurity Bootcamp</h2>
              <p className="text-muted-foreground text-left mb-4">
                3 days of intensive hands-on training on network security, penetration testing, and hardware exploitation.
              </p>
              <div className="flex items-center gap-2 text-primary text-sm font-bold mb-6">
                <MapPin className="h-4 w-4" />
                <span>Venue: Alumni Auditorium</span>
              </div>
              <ul className="space-y-3 mb-8">
                {["Hands-on Labs", "Expert Mentorship", "Participation Certificate"].map((item) => (
                  <li key={item} className="flex items-center gap-2 text-sm text-foreground/80">
                    <div className="h-1.5 w-1.5 rounded-full bg-primary" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            <Button variant={bootcampReg ? "cyber-outline" : "cyber"} className="w-full group" onClick={handleBootcampClick}>
              {bootcampReg ? "View Bootcamp Details" : "Register for Bootcamp"} 
              {bootcampReg ? <Eye className="ml-2 h-4 w-4" /> : <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />}
            </Button>
          </motion.div>

          {/* Hackathon Card */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="surface-card p-8 hover:border-secondary/50 transition-all group flex flex-col justify-between shadow-lg"
          >
            <div>
              <div className="h-16 w-16 bg-secondary/10 rounded-2xl flex items-center justify-center mb-6 border border-secondary/20 group-hover:scale-110 transition-transform">
                <img src="/hackathon-logo.png" alt="Hackathon Logo" className="h-10 w-10 object-contain opacity-80 group-hover:opacity-100 transition-opacity" />
              </div>
              <h2 className="font-display font-bold text-2xl text-foreground mb-4 text-left">CTF Hackathon</h2>
              <p className="text-muted-foreground text-left mb-4">
                A 48-hour cyber security challenge. Compete in teams of 2-3 and win from a ₹1.5 Lakh prize pool.
              </p>
              <div className="flex items-center gap-2 text-secondary text-sm font-bold mb-6">
                <MapPin className="h-4 w-4" />
                <span>Venue: Dr.Br.Ambedkar Library</span>
              </div>
              <div className="flex items-center gap-2 text-secondary text-sm font-bold mb-6">
                <MapPin className="h-4 w-4" />
                <span>Venue: Dr.Br.Ambedkar Library</span>
              </div>
              <ul className="space-y-3 mb-8">
                {["Team Challenges", "Exciting Rewards", "Cyber Security Focus"].map((item) => (
                  <li key={item} className="flex items-center gap-2 text-sm text-foreground/80">
                    <div className="h-1.5 w-1.5 rounded-full bg-secondary" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            <Button variant={hackathonReg ? "cyber-outline" : "cyber-purple"} className="w-full group" onClick={handleHackathonClick}>
              {hackathonReg ? "View Hackathon Details" : "Register for Hackathon"}
              {hackathonReg ? <Eye className="ml-2 h-4 w-4" /> : <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />}
            </Button>
          </motion.div>
        </div>
      </div>

      <Dialog open={isDetailsOpen} onOpenChange={setIsDetailsOpen}>
        <DialogContent className="max-w-2xl bg-card border-border overflow-y-auto max-h-[90vh]">
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold flex items-center gap-3">
              <img src={viewingType === 'hackathon' ? "/hackathon-logo.png" : "/bootcamp-logo.png"} alt="Logo" className="h-8 w-8 object-contain" />
              {viewingType === 'hackathon' ? "Hackathon Registration" : "Bootcamp Registration"}
            </DialogTitle>
            <DialogDescription>
              Your registered information for ISEA JNTUK - 2026.
            </DialogDescription>
          </DialogHeader>

          {viewingReg && (
            <div className="space-y-6 py-4">
              {viewingType === 'hackathon' ? (
                <>
                  <div className="surface-card p-4 border-primary/20 bg-primary/5 rounded-lg">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-xs text-muted-foreground uppercase font-semibold">Team Name</p>
                        <p className="text-primary font-bold text-xl">{viewingReg.team_name}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-xs text-muted-foreground uppercase font-semibold">Status</p>
                        <span className="text-[10px] bg-terminal-green/20 text-terminal-green px-2 py-0.5 rounded-full font-bold uppercase">Confirmed</span>
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="surface-card p-4 border-secondary/20 bg-secondary/5 rounded-lg space-y-3">
                      <h4 className="font-bold text-secondary flex items-center gap-2 border-b border-secondary/10 pb-2">
                        <User className="h-4 w-4" /> Team Lead
                      </h4>
                      <div className="space-y-2 text-sm">
                        <p><span className="text-muted-foreground">Name:</span> {viewingReg.team_lead_name}</p>
                        <p><span className="text-muted-foreground">Roll:</span> {viewingReg.team_lead_roll}</p>
                        <p className="truncate"><span className="text-muted-foreground">Email:</span> {viewingReg.team_lead_email}</p>
                      </div>
                    </div>

                    <div className="surface-card p-4 border-terminal-green/20 bg-terminal-green/5 rounded-lg space-y-3">
                      <h4 className="font-bold text-terminal-green flex items-center gap-2 border-b border-terminal-green/10 pb-2">
                        <UsersIcon className="h-4 w-4" /> Member 2
                      </h4>
                      <div className="space-y-2 text-sm">
                        <p><span className="text-muted-foreground">Name:</span> {viewingReg.member2_name}</p>
                        <p><span className="text-muted-foreground">Roll:</span> {viewingReg.member2_roll}</p>
                        <p className="truncate"><span className="text-muted-foreground">Email:</span> {viewingReg.member2_email}</p>
                      </div>
                    </div>

                    {viewingReg.member3_name && (
                      <div className="surface-card p-4 border-muted/20 bg-muted/5 rounded-lg space-y-3 md:col-span-2">
                        <h4 className="font-bold text-muted-foreground flex items-center gap-2 border-b border-border pb-2">
                          <UsersIcon className="h-4 w-4" /> Member 3
                        </h4>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-2 text-sm">
                          <p><span className="text-muted-foreground">Name:</span> {viewingReg.member3_name}</p>
                          <p><span className="text-muted-foreground">Roll:</span> {viewingReg.member3_roll}</p>
                          <p className="truncate"><span className="text-muted-foreground">Email:</span> {viewingReg.member3_email}</p>
                        </div>
                      </div>
                    )}
                  </div>
                </>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="surface-card p-4 border-primary/20 bg-primary/5 rounded-lg space-y-4 md:col-span-2">
                    <div className="flex items-center gap-4">
                      <div className="h-12 w-12 rounded-full bg-primary/20 flex items-center justify-center text-primary font-bold text-xl">
                        {viewingReg.full_name ? viewingReg.full_name[0] : 'U'}
                      </div>
                      <div>
                        <h4 className="font-bold text-lg">{viewingReg.full_name}</h4>
                        <p className="text-xs text-muted-foreground uppercase tracking-wider">{viewingReg.course} • {viewingReg.department}</p>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div className="flex items-center gap-3">
                      <div className="h-8 w-8 rounded-lg bg-muted flex items-center justify-center text-muted-foreground">
                        <Mail className="h-4 w-4" />
                      </div>
                      <div>
                        <p className="text-[10px] uppercase text-muted-foreground font-semibold">Email ID</p>
                        <p className="text-sm font-medium">{viewingReg.email}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="h-8 w-8 rounded-lg bg-muted flex items-center justify-center text-muted-foreground">
                        <Phone className="h-4 w-4" />
                      </div>
                      <div>
                        <p className="text-[10px] uppercase text-muted-foreground font-semibold">Mobile</p>
                        <p className="text-sm font-medium">{viewingReg.phone}</p>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div className="flex items-center gap-3">
                      <div className="h-8 w-8 rounded-lg bg-muted flex items-center justify-center text-muted-foreground">
                        <Hash className="h-4 w-4" />
                      </div>
                      <div>
                        <p className="text-[10px] uppercase text-muted-foreground font-semibold">Roll Number</p>
                        <p className="text-sm font-medium">{viewingReg.roll_number}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="h-8 w-8 rounded-lg bg-muted flex items-center justify-center text-muted-foreground">
                        <FileText className="h-4 w-4" />
                      </div>
                      <div>
                        <p className="text-[10px] uppercase text-muted-foreground font-semibold">Registration Date</p>
                        <p className="text-sm font-medium">{new Date(viewingReg.created_at).toLocaleDateString()}</p>
                      </div>
                    </div>
                  </div>
                </div>
              )}
              
              <div className="mt-4 pt-4 border-t border-border flex justify-end">
                <Button variant="outline" onClick={() => setIsDetailsOpen(false)}>Close</Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* Hackathon Form Dialog */}
      <Dialog open={isHackathonFormOpen} onOpenChange={setIsHackathonFormOpen}>
        <DialogContent className="max-w-xl bg-card border-border overflow-y-auto max-h-[90vh] p-0 border-none shadow-2xl">
          <div className="surface-card p-8 md:p-12 space-y-8">
            <div className="text-center space-y-2">
              <img src="/hackathon-logo.png" alt="Hackathon" className="h-16 w-16 mx-auto mb-4 object-contain" />
              <h2 className="font-display font-bold text-3xl text-foreground">
                Hackathon <span className="text-secondary">Registration</span>
              </h2>
              <p className="text-muted-foreground">Complete your team registration for the CTF challenge.</p>
            </div>

            <div className="flex flex-col items-center space-y-6">
              <div className="p-4 bg-white rounded-xl shadow-lg border-4 border-secondary/20">
                <img 
                  src="/hackathon-qr.png" 
                  alt="Hackathon Registration QR" 
                  className="w-48 h-48 object-contain"
                />
              </div>
              
              <div className="text-center space-y-3">
                <p className="text-sm text-foreground/80">Scan the QR code or click the button below to fill out the official registration form.</p>
                <div className="h-px bg-border/50 w-full max-w-[200px] mx-auto" />
              </div>

              <div className="flex flex-col gap-3 w-full">
                <a 
                  href="https://forms.gle/xBByjGPuVNHcB5XE9" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="w-full"
                >
                  <Button variant="cyber-purple" className="w-full py-6 text-lg">
                    Open Official Form
                  </Button>
                </a>
                <Button variant="ghost" onClick={() => setIsHackathonFormOpen(false)} className="text-muted-foreground hover:text-foreground">
                  Cancel
                </Button>
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Bootcamp Form Dialog */}
      <Dialog open={isBootcampFormOpen} onOpenChange={setIsBootcampFormOpen}>
        <DialogContent className="max-w-xl bg-card border-border overflow-y-auto max-h-[90vh] p-0 border-none shadow-2xl">
          <div className="surface-card p-8 md:p-12 space-y-8">
            <div className="text-center space-y-2">
              <img src="/bootcamp-logo.png" alt="Bootcamp" className="h-16 w-16 mx-auto mb-4 object-contain" />
              <h2 className="font-display font-bold text-3xl text-foreground">
                Bootcamp <span className="text-primary">Enrollment</span>
              </h2>
              <p className="text-muted-foreground">Join the ISEA Cyber Security training program.</p>
            </div>

            <div className="flex flex-col items-center space-y-6">
              <div className="p-4 bg-white rounded-xl shadow-lg border-4 border-primary/20">
                <img 
                  src="/bootcamp-qr.png" 
                  alt="Bootcamp Registration QR" 
                  className="w-48 h-48 object-contain"
                />
              </div>
              
              <div className="text-center space-y-3">
                <p className="text-sm text-foreground/80">Scan the QR code or click the button below to fill out the official registration form.</p>
                <div className="h-px bg-border/50 w-full max-w-[200px] mx-auto" />
              </div>

              <div className="flex flex-col gap-3 w-full">
                <a 
                  href="https://forms.gle/d4ArvzUgTSKZgg1H7" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="w-full"
                >
                  <Button variant="cyber" className="w-full py-6 text-lg">
                    Open Official Form
                  </Button>
                </a>
                <Button variant="ghost" onClick={() => setIsBootcampFormOpen(false)} className="text-muted-foreground hover:text-foreground">
                  Cancel
                </Button>
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      <Footer />
    </div>
  );
};

export default RegistrationOptions;
