import { Shield } from "lucide-react";
import { Link } from "react-router-dom";

const Footer = () => (
  <footer className="bg-card border-t border-border py-12">
    <div className="container mx-auto px-4">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
        <div className="flex flex-col items-center md:items-start">
          <div className="flex items-center gap-4 mb-4">
            <span className="font-display font-bold text-foreground text-lg">ISEA JNTUK - 2026</span>
          </div>
          <p className="text-sm text-muted-foreground">
            Information Security Education and Awareness (ISEA) - 2026. Under ISEA Project Phase-III.
          </p>
        </div>
        <div>
          <h4 className="font-display font-semibold text-foreground mb-3">Quick Links</h4>
          <div className="space-y-2">
            {["Programs", "Prizes", "FAQ"].map((item) => (
              <Link key={item} to={`/${item.toLowerCase()}`} className="block text-sm text-muted-foreground hover:text-primary transition-colors">{item}</Link>
            ))}
          </div>
        </div>
        <div>
          <h4 className="font-display font-semibold text-foreground mb-3">Event</h4>
          <div className="space-y-2 text-sm text-muted-foreground">
            <p>Bootcamp: 23–25 March 2026</p>
            <p>Hackathon: 24–25 March 2026</p>
            <p>Venue: Alumni Auditorium, JNTUK</p>
          </div>
        </div>
        <div>
          <h4 className="font-display font-semibold text-foreground mb-3">Contact</h4>
          <div className="space-y-2 text-sm text-muted-foreground">
            <p>Alumni Auditorium, JNTUK</p>
            <p>Andhra Pradesh, India</p>
            <p>nghsb2026@jntuk.edu.in</p>
          </div>
        </div>
      </div>
      <div className="mt-8 pt-8 border-t border-border text-center text-sm text-muted-foreground">
        © 2026 Information Security Education and Awareness (ISEA). All rights reserved.
      </div>
    </div>
  </footer>
);

export default Footer;
