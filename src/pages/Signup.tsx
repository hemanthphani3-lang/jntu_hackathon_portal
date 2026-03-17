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
    email: "", 
    password: "", 
    confirmPassword: ""
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

    if (form.password !== form.confirmPassword) {
      toast({ title: "Passwords don't match", variant: "destructive" });
      setIsLoading(false);
      return;
    }
    
    try {
      const { data, error } = await supabase.auth.signUp({
        email: form.email,
        password: form.password,
      });

      if (error) throw error;

      toast({ 
        title: "Account created!", 
        description: "Please check your email to verify your account." 
      });
      
      setTimeout(() => navigate("/login"), 3000);
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
              Create <span className="text-primary">Account</span>
            </h1>
            <p className="text-sm text-muted-foreground">
              Join the Cyber Secure Hub community.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="surface-card p-6 space-y-4">
            <div>
              <Label htmlFor="email">Email</Label>
              <Input id="email" type="email" value={form.email} onChange={(e) => update("email", e.target.value)} className="bg-background border-border mt-1" required />
            </div>
            <div className="grid grid-cols-1 gap-4 text-left">
              <div>
                <Label htmlFor="password">Password</Label>
                <Input id="password" type="password" value={form.password} onChange={(e) => update("password", e.target.value)} className="bg-background border-border mt-1" required />
              </div>
              <div>
                <Label htmlFor="confirmPassword">Confirm Password</Label>
                <Input id="confirmPassword" type="password" value={form.confirmPassword} onChange={(e) => update("confirmPassword", e.target.value)} className="bg-background border-border mt-1" required />
              </div>
            </div>

            <Button variant="cyber" type="submit" className="w-full mt-2" disabled={isLoading}>
              {isLoading ? "Creating Account..." : "Sign Up"}
            </Button>
            <p className="text-center text-sm text-muted-foreground mt-4">
              Already have an account?{" "}
              <Link to="/login" className="text-primary hover:underline">Login</Link>
            </p>
          </form>
        </motion.div>
      </div>
      <Footer />
    </div>
  );
};

export default Signup;
