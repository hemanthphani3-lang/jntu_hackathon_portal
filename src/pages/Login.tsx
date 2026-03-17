import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { Link, useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";

const Login = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [form, setForm] = useState({ email: "", password: "" });

  const handleGoogleLogin = async () => {
    try {
      const { error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
          redirectTo: window.location.origin,
        },
      });
      if (error) throw error;
    } catch (error: any) {
      toast({
        title: "Login failed",
        description: error.message,
        variant: "destructive",
      });
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Hackathon Admin check
    if (form.email === "admin@1234" && form.password === "admin@1234") {
      toast({ title: "Hackathon Admin Login Successful!", description: "Redirecting to hackathon dashboard..." });
      navigate("/admin?type=hackathon");
      return;
    }

    // Bootcamp Admin check
    if (form.email === "admin@123" && form.password === "admin@123") {
      toast({ title: "Bootcamp Admin Login Successful!", description: "Redirecting to bootcamp dashboard..." });
      navigate("/admin?type=bootcamp");
      return;
    }

    // Editor check
    if (form.email === "edit@123" && form.password === "edit@123") {
      toast({ title: "Editor Login Successful!", description: "Redirecting to editor dashboard..." });
      navigate("/editor");
      return;
    }

    toast({ title: "Login functionality", description: "Backend auth will be connected next." });
  };

  return (
    <div className="min-h-screen bg-transparent">
      <Navbar />
      <div className="pt-24 pb-16 container mx-auto px-4">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="max-w-md mx-auto">
          <div className="text-center mb-8">
            <h1 className="font-display font-bold text-3xl text-foreground mb-2">
              Welcome <span className="text-primary">Back</span>
            </h1>
            <p className="text-sm text-muted-foreground">
              Don't have an account?{" "}
              <Link to="/signup" className="text-primary hover:underline">Sign Up</Link>
            </p>
          </div>

          <form onSubmit={handleSubmit} className="surface-card p-6 space-y-4">
            <div>
              <Label htmlFor="email">Email</Label>
              <Input id="email" type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} className="bg-background border-border mt-1" required />
            </div>
            <div>
              <Label htmlFor="password">Password</Label>
              <Input id="password" type="password" value={form.password} onChange={(e) => setForm({ ...form, password: e.target.value })} className="bg-background border-border mt-1" required />
            </div>
            <Button variant="cyber" type="submit" className="w-full">Login</Button>
          </form>

          <div className="mt-6">
            <div className="relative mb-6">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-border"></div>
              </div>
              <div className="relative flex justify-center text-sm uppercase">
                <span className="bg-background px-2 text-muted-foreground">Or continue with</span>
              </div>
            </div>

            <Button 
              variant="outline" 
              type="button" 
              className="w-full bg-background border-border hover:bg-muted font-medium py-6"
              onClick={handleGoogleLogin}
            >
              <svg className="mr-2 h-5 w-5" aria-hidden="true" focusable="false" data-prefix="fab" data-icon="google" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 488 512">
                <path fill="currentColor" d="M488 261.8C488 403.3 391.1 504 248 504 110.8 504 0 393.2 0 256S110.8 8 248 8c66.8 0 123 24.5 166.3 64.9l-67.5 64.9C258.5 52.6 94.3 116.6 94.3 256c0 86.5 69.1 156.6 153.7 156.6 98.2 0 135-70.4 140.8-106.9H248v-85.3h236.1c2.3 12.7 3.9 24.9 3.9 41.4z"></path>
              </svg>
              Login with Google
            </Button>
          </div>
        </motion.div>
      </div>
      <Footer />
    </div>
  );
};

export default Login;
