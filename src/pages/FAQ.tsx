import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { motion } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

const faqs = [
  { q: "Who can participate?", a: "All students of JNTUK, Kakinada are eligible to participate in both the bootcamp and hackathon." },
  { q: "Is there a registration fee?", a: "No, the event is free of cost as it is organized under the ISEA Project Phase-III government initiative." },
  { q: "Do I need prior cybersecurity experience?", a: "No prior experience is required for the bootcamp. The hackathon is suitable for participants with basic to intermediate knowledge." },
  { q: "Can I participate in both the bootcamp and hackathon?", a: "Yes! We encourage participants to attend the bootcamp sessions and also compete in the CTF hackathon." },
  { q: "What should I bring?", a: "Bring your own laptop with at least 8GB RAM. You'll need it for virtual labs and the hackathon. We'll provide all software and lab materials." },
  { q: "How are hackathon teams formed?", a: "Teams must have 2-3 members. You can form your own team or we can help you find teammates during the event." },
  { q: "Will certificates be provided?", a: "Yes, all bootcamp attendees will receive participation certificates. Hackathon winners receive additional achievement certificates." },
  { q: "Is there a limit on bootcamp participants?", a: "Yes, the bootcamp is limited to 200 participants on a first-come, first-served basis. Register early!" },
];

const FAQ = () => (
  <div className="min-h-screen bg-transparent">
    <Navbar />
    <div className="pt-24 pb-16 container mx-auto px-4">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-16">
        <h1 className="font-display font-bold text-4xl md:text-5xl text-foreground mb-4">
          Frequently Asked <span className="text-primary">Questions</span>
        </h1>
      </motion.div>

      <div className="max-w-2xl mx-auto">
        <Accordion type="single" collapsible className="space-y-3">
          {faqs.map((faq, i) => (
            <AccordionItem key={i} value={`faq-${i}`} className="surface-card px-6 border rounded-lg border-border">
              <AccordionTrigger className="text-sm font-medium text-foreground hover:text-primary py-4 hover:no-underline">
                {faq.q}
              </AccordionTrigger>
              <AccordionContent className="text-sm text-muted-foreground pb-4">
                {faq.a}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </div>
    <Footer />
  </div>
);

export default FAQ;
