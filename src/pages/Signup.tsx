import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { Link, useSearchParams, useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import ScanningOverlay from "@/components/ScanningOverlay";
import { useAuth } from "@/hooks/use-auth";
import { useEffect } from "react";


const courses = ["B.TECH", "M.TECH", "MCS", "MBA"];
const years = ["1st Year", "2nd Year", "3rd Year", "4th Year"];

const Signup = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { user, isAuthenticated } = useAuth();
  const [searchParams] = useSearchParams();
  const intent = searchParams.get("intent");
  const isBootcamp = intent === "bootcamp";
  const isHackathon = intent === "hackathon";

  const [isLoading, setIsLoading] = useState(false);
  const [showSuccessScan, setShowSuccessScan] = useState(false);
  const [form, setForm] = useState({
    // Generic
    fullName: "", email: "", password: "", confirmPassword: "",
    phone: "", rollNumber: "", department: "", year: "", course: "B.TECH",
    // Hackathon
    teamName: "",
    teamLeadName: "", teamLeadEmail: "", teamLeadPhone: "", teamLeadRoll: "",
    member2Name: "", member2Email: "", member2Phone: "", member2Roll: "",
    member3Name: "", member3Email: "", member3Phone: "", member3Roll: ""
  });

  useEffect(() => {
    if (isAuthenticated && user?.email) {
      setForm(f => ({
        ...f,
        email: user.email || "",
        teamLeadEmail: user.email || ""
      }));
    }
  }, [isAuthenticated, user?.email]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    const needsPassword = !isBootcamp;
    if (needsPassword && form.password !== form.confirmPassword) {
      toast({ title: "Passwords don't match", variant: "destructive" });
      setIsLoading(false);
      return;
    }
    
    try {
      // Check for existing registration before proceeding
      const emailToCheck = form.email || form.teamLeadEmail;
      const { data: existingReg, error: checkError } = await (supabase as any)
        .from('registrations')
        .select('id')
        .or(`email.eq.${emailToCheck},team_lead_email.eq.${emailToCheck},member2_email.eq.${emailToCheck},member3_email.eq.${emailToCheck}`)
        .eq('intent', intent)
        .single();

      if (existingReg) {
        toast({
          title: "Already Registered",
          description: `You have already registered for the ${intent === 'hackathon' ? 'CTF Hackathon' : 'Cybersecurity Bootcamp'}.`,
          variant: "destructive",
        });
        setIsLoading(false);
        return;
      }

      const { error } = await (supabase as any)
        .from('registrations')
        .insert([{
          intent: intent || 'general',
          full_name: form.fullName,
          email: form.email,
          phone: form.phone,
          roll_number: form.rollNumber,
          department: form.department,
          year: form.year,
          course: form.course,
          team_name: form.teamName,
          team_lead_name: form.teamLeadName,
          team_lead_email: form.teamLeadEmail,
          team_lead_phone: form.teamLeadPhone,
          team_lead_roll: form.teamLeadRoll,
          member2_name: form.member2Name,
          member2_email: form.member2Email,
          member2_phone: form.member2Phone,
          member2_roll: form.member2Roll,
          member3_name: form.member3Name,
          member3_email: form.member3Email,
          member3_phone: form.member3Phone,
          member3_roll: form.member3Roll,
          password: form.password // For demo purposes
        }]);

      if (error) throw error;

      toast({ 
        title: isHackathon ? "Hackathon Team Registered!" : (isBootcamp ? "Bootcamp Registration Successful!" : "Account created!"), 
        description: isBootcamp ? "Your registration has been submitted successfully." : "You can now log in and manage your participation." 
      });
      
      if (isBootcamp || isHackathon) {
        setShowSuccessScan(true);
      } else {
        setTimeout(() => navigate("/"), 2000);
      }
    } catch (error: any) {
      toast({ 
        title: "Registration failed", 
        description: error.message,
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  const update = (field: string, value: string) => setForm((f) => ({ ...f, [field]: value }));

  return (
    <div className="min-h-screen bg-transparent">
      <ScanningOverlay 
        isVisible={showSuccessScan} 
        logoSrc={isHackathon ? "/hackathon-logo.png" : "/bootcamp-logo.png"} 
        onComplete={() => navigate("/")} 
        title={isHackathon ? "Finalizing Team Entry..." : "Confirming Enrollment..."}
        variant={isBootcamp ? "training" : "hacking"}
      />
      <Navbar />
      <div className="pt-24 pb-16 container mx-auto px-4">
        <motion.div 
          initial={{ opacity: 0, y: 20 }} 
          animate={{ opacity: 1, y: 0 }} 
          className={isHackathon ? "max-w-2xl mx-auto" : "max-w-md mx-auto"}
        >
          <div className="text-center mb-8">
            <h1 className="font-display font-bold text-3xl text-foreground mb-2">
              {isHackathon ? "Hackathon Team " : (isBootcamp ? "Bootcamp " : "Create ")}
              <span className="text-primary">
                {isHackathon ? "Registration" : (isBootcamp ? "Registration" : "Account")}
              </span>
            </h1>
            <p className="text-sm text-muted-foreground">
              {isHackathon 
                ? "Form your team and register for the CTF challenge." 
                : (isBootcamp ? "Please fill in your details to join the bootcamp." : "Already have an account? ")}
              {!isBootcamp && !isHackathon && <Link to="/login" className="text-primary hover:underline">Login</Link>}
            </p>
          </div>

          <form onSubmit={handleSubmit} className="surface-card p-6 space-y-6">
            {isHackathon ? (
              <>
                {/* Team Info */}
                <div className="space-y-4">
                  <h3 className="font-display font-bold text-lg text-primary border-b border-primary/10 pb-2">Team Details</h3>
                  <div>
                    <Label htmlFor="teamName">Team Name</Label>
                    <Input id="teamName" value={form.teamName} onChange={(e) => update("teamName", e.target.value)} className="bg-background border-border mt-1" required />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="password">Team Password</Label>
                      <Input id="password" type="password" value={form.password} onChange={(e) => update("password", e.target.value)} className="bg-background border-border mt-1" required />
                    </div>
                    <div>
                      <Label htmlFor="confirmPassword">Confirm Password</Label>
                      <Input id="confirmPassword" type="password" value={form.confirmPassword} onChange={(e) => update("confirmPassword", e.target.value)} className="bg-background border-border mt-1" required />
                    </div>
                  </div>
                </div>

                {/* Team Lead */}
                <div className="space-y-4 pt-2">
                  <h3 className="font-display font-bold text-lg text-secondary border-b border-secondary/10 pb-2">Team Lead (Member 1)</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="teamLeadName">Full Name</Label>
                      <Input id="teamLeadName" value={form.teamLeadName} onChange={(e) => update("teamLeadName", e.target.value)} className="bg-background border-border mt-1" required />
                    </div>
                    <div>
                      <Label htmlFor="teamLeadRoll">Roll Number</Label>
                      <Input id="teamLeadRoll" value={form.teamLeadRoll} onChange={(e) => update("teamLeadRoll", e.target.value)} className="bg-background border-border mt-1" required />
                    </div>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="teamLeadEmail">Email ID (Linked to Account)</Label>
                      <Input id="teamLeadEmail" type="email" value={form.teamLeadEmail} readOnly className="bg-muted border-border mt-1 cursor-not-allowed opacity-80" required />
                    </div>
                    <div>
                      <Label htmlFor="teamLeadPhone">Phone Number</Label>
                      <Input id="teamLeadPhone" type="tel" value={form.teamLeadPhone} onChange={(e) => update("teamLeadPhone", e.target.value)} className="bg-background border-border mt-1" required />
                    </div>
                  </div>
                </div>

                {/* Member 2 */}
                <div className="space-y-4 pt-2">
                  <h3 className="font-display font-bold text-lg text-terminal-green border-b border-terminal-green/10 pb-2">Member 2</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="member2Name">Full Name</Label>
                      <Input id="member2Name" value={form.member2Name} onChange={(e) => update("member2Name", e.target.value)} className="bg-background border-border mt-1" required />
                    </div>
                    <div>
                      <Label htmlFor="member2Roll">Roll Number</Label>
                      <Input id="member2Roll" value={form.member2Roll} onChange={(e) => update("member2Roll", e.target.value)} className="bg-background border-border mt-1" required />
                    </div>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="member2Email">Email ID</Label>
                      <Input id="member2Email" type="email" value={form.member2Email} onChange={(e) => update("member2Email", e.target.value)} className="bg-background border-border mt-1" required />
                    </div>
                    <div>
                      <Label htmlFor="member2Phone">Phone Number</Label>
                      <Input id="member2Phone" type="tel" value={form.member2Phone} onChange={(e) => update("member2Phone", e.target.value)} className="bg-background border-border mt-1" required />
                    </div>
                  </div>
                </div>

                {/* Member 3 */}
                <div className="space-y-4 pt-2">
                  <div className="flex justify-between items-center border-b border-muted-foreground/10 pb-2">
                    <h3 className="font-display font-bold text-lg text-muted-foreground">Member 3</h3>
                    <span className="text-[10px] uppercase tracking-widest text-muted-foreground/50 border border-muted-foreground/20 px-2 py-0.5 rounded">Optional</span>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="member3Name">Full Name</Label>
                      <Input id="member3Name" value={form.member3Name} onChange={(e) => update("member3Name", e.target.value)} className="bg-background border-border mt-1" />
                    </div>
                    <div>
                      <Label htmlFor="member3Roll">Roll Number</Label>
                      <Input id="member3Roll" value={form.member3Roll} onChange={(e) => update("member3Roll", e.target.value)} className="bg-background border-border mt-1" />
                    </div>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="member3Email">Email ID</Label>
                      <Input id="member3Email" type="email" value={form.member3Email} onChange={(e) => update("member3Email", e.target.value)} className="bg-background border-border mt-1" />
                    </div>
                    <div>
                      <Label htmlFor="member3Phone">Phone Number</Label>
                      <Input id="member3Phone" type="tel" value={form.member3Phone} onChange={(e) => update("member3Phone", e.target.value)} className="bg-background border-border mt-1" />
                    </div>
                  </div>
                </div>
              </>
            ) : (
              <>
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="fullName">Full Name</Label>
                    <Input id="fullName" value={form.fullName} onChange={(e) => update("fullName", e.target.value)} className="bg-background border-border mt-1" required />
                  </div>
                  <div>
                    <Label htmlFor="email">Email ID (Linked to Account)</Label>
                    <Input id="email" type="email" value={form.email} readOnly className="bg-muted border-border mt-1 cursor-not-allowed opacity-80" required />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="phone">Mobile Number</Label>
                      <Input id="phone" type="tel" value={form.phone} onChange={(e) => update("phone", e.target.value)} className="bg-background border-border mt-1" required />
                    </div>
                    <div>
                      <Label htmlFor="rollNumber">Roll Number</Label>
                      <Input id="rollNumber" value={form.rollNumber} onChange={(e) => update("rollNumber", e.target.value)} className="bg-background border-border mt-1" required />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label>Department</Label>
                      <Input id="department" value={form.department} onChange={(e) => update("department", e.target.value)} className="bg-background border-border mt-1" required placeholder="Ex: CSE, ECE, IT..." />
                    </div>
                    <div>
                      <Label>{isBootcamp ? "Course" : "Year of Study"}</Label>
                      <Select 
                        value={isBootcamp ? form.course : form.year} 
                        onValueChange={(v) => update(isBootcamp ? "course" : "year", v)}
                      >
                        <SelectTrigger className="bg-background border-border mt-1">
                          <SelectValue placeholder="Select" />
                        </SelectTrigger>
                        <SelectContent>
                          {isBootcamp 
                            ? courses.map((c) => <SelectItem key={c} value={c}>{c}</SelectItem>)
                            : years.map((y) => <SelectItem key={y} value={y}>{y}</SelectItem>)
                          }
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  {!isBootcamp && (
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="password">Password</Label>
                        <Input id="password" type="password" value={form.password} onChange={(e) => update("password", e.target.value)} className="bg-background border-border mt-1" required />
                      </div>
                      <div>
                        <Label htmlFor="confirmPassword">Confirm Password</Label>
                        <Input id="confirmPassword" type="password" value={form.confirmPassword} onChange={(e) => update("confirmPassword", e.target.value)} className="bg-background border-border mt-1" required />
                      </div>
                    </div>
                  )}
                </div>
              </>
            )}

            <Button variant="cyber" type="submit" className="w-full mt-2" disabled={isLoading}>
              {isLoading ? "Submitting..." : (isHackathon ? "Submit Team Registration" : (isBootcamp ? "Submit Registration" : "Create Account"))}
            </Button>
          </form>
        </motion.div>
      </div>
      <Footer />
    </div>
  );
};

export default Signup;
