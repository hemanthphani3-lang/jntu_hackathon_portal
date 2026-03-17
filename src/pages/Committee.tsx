import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { motion } from "framer-motion";
import { User, Phone, Mail, Award, Users, GraduationCap } from "lucide-react";

const chiefPatron = {
  name: "Prof. C.S.R.K. Prasad",
  role: "Chief Patron",
  title: "Hon'ble Vice Chancellor, JNTUK, Kakinada",
};

const patrons = [
  { name: "Prof. P. Subbarao", role: "Patron", title: "Rector, JNTUK, Kakinada" },
  { name: "Prof. R. Srinivasa Rao", role: "Patron", title: "Registrar, JNTUK, Kakinada" },
  { name: "Prof. D. Koteswara Rao", role: "Patron", title: "OSD, JNTUK, Kakinada" },
];

const leadership = [
  { name: "Prof. K. Padma Raju", role: "Co-Patron", title: "Principal, UCEK(A), JNTUK, Kakinada" },
  { name: "Prof. N. Ramakrishnaiah", role: "Convener", title: "HoD-CSE, UCEK (A), JNTUK, Kakinada" },
  { name: "Dr. K. V. Ramana", role: "Coordinator", title: "Senior Professor of CSE & Principal Investigator ISEA project phase - III" },
];

const organizingCommittee = [
  { name: "Prof. M.H.M. Krishna Prasad", role: "Professor" },
  { name: "Prof. A. Krishna Mohan", role: "Professor" },
  { name: "Prof. K. Sahadevaiah", role: "Professor" },
  { name: "Prof. D. Haritha", role: "Professor" },
  { name: "Prof. A.S.N. Chakravarthy", role: "Professor" },
  { name: "Dr. S.S.S.N. Usha Devi.N", role: "Associate Professor" },
  { name: "Dr. E. Suneetha", role: "Associate Professor" },
  { name: "Dr. S. Surekha", role: "Associate Professor" },
  { name: "Dr. T. Siva Ramakrishna", role: "Associate Professor" },
  { name: "Dr. S. Chandrasekhar", role: "Assistant Professor" },
  { name: "Dr. A. Karuna", role: "Assistant Professor" },
];

const facultyCoordinators = [
  { name: "Sri K Ravi Kiran", phone: "9515790099" },
  { name: "Sri B Hemanth Kumar", phone: "9742423919" },
  { name: "Smt M Aruna", phone: "9182761681" },
  { name: "Smt M V S V Kiranmai", phone: "9848818584" },
];

const studentCoordinators = [
  { name: "Ch. Varun Tej", phone: "9515130747", title: "CSE(ICP)" },
  { name: "Bh.Hemanth", phone: "9169225566", title: "CSE(ICP)" },
  { name: "D. K. Krithi", phone: "6300339583" },
  { name: "M. Omanand", phone: "8143938358" },
  { name: "M. Viswanadh", phone: "6304979772" },
  { name: "N. Sai Sreeja", phone: "9490999940", title: "CSE(ICP)" },
  { name: "R. Arjun", phone: "7382381967" },
  { name: "J. Chaitanya", phone: "9059464083" },
  { name: "P. Aravind", phone: "8179074848" },
  { name: "Teja Tanishka", phone: "7075378999" },
  { name: "Sri Lasya", phone: "8977026625" },
  { name: "M. Medha Sai", phone: "6309355777" },
  { name: "Varshini", phone: "9390247275" },
  { name: "Sriram" },
  { name: "Viswanath", title: "AIML ICP" },
  { name: "Sandeep" },
  { name: "Y. Kowshik" },
  { name: "Mohith", title: "M.Tech CSE" },
  { name: "Sai", title: "M.Tech AIML" },
  { name: "Rajesh. K" },
  { name: "Sankalp" },
];

const MemberCard = ({ name, role, title, phone, icon: Icon = User, color = "primary" }: any) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    className="surface-card p-6 flex flex-col items-center text-center h-full hover-glow"
  >
    <div className={`w-14 h-14 rounded-full bg-${color}/10 flex items-center justify-center mb-4 border border-${color}/20`}>
      <Icon className={`h-7 w-7 text-${color}`} />
    </div>
    <h3 className="font-display font-semibold text-foreground text-lg mb-1">{name}</h3>
    {role && <p className={`text-sm text-${color} font-medium mb-1`}>{role}</p>}
    {title && <p className="text-xs text-muted-foreground leading-relaxed italic">{title}</p>}
    {phone && (
      <div className="mt-3 flex items-center gap-2 text-xs text-muted-foreground hover:text-primary transition-colors">
        <Phone className="h-3 w-3" />
        <span>{phone}</span>
      </div>
    )}
  </motion.div>
);

const Committee = () => (
  <div className="min-h-screen bg-transparent">
    <Navbar />

    <div className="pt-32 pb-24 container mx-auto px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-20"
      >
        <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-primary/30 bg-primary/5 text-primary text-xs font-medium mb-4">
          <Users className="w-3 h-3" />
          The Team Behind The Event
        </span>
        <h1 className="font-display font-bold text-4xl md:text-6xl text-foreground mb-6">
          Organizing <span className="text-gradient-cyber">Committee</span>
        </h1>
        <div className="w-24 h-1.5 bg-gradient-to-r from-primary to-secondary mx-auto rounded-full" />
      </motion.div>

      {/* Chief Patron */}
      <div className="max-w-md mx-auto mb-16">
        <MemberCard {...chiefPatron} icon={Award} />
      </div>

      {/* Patrons */}
      <h2 className="font-display font-bold text-2xl text-center mb-10 text-muted-foreground flex items-center justify-center gap-4">
        <div className="h-px bg-border flex-1" />
        Patrons
        <div className="h-px bg-border flex-1" />
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto mb-20">
        {patrons.map((p) => <MemberCard key={p.name} {...p} />)}
      </div>

      {/* Leadership */}
      <h2 className="font-display font-bold text-2xl text-center mb-10 text-muted-foreground flex items-center justify-center gap-4">
        <div className="h-px bg-border flex-1" />
        Leadership
        <div className="h-px bg-border flex-1" />
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto mb-20">
        {leadership.map((l) => <MemberCard key={l.name} {...l} />)}
      </div>

      {/* Organizing Committee */}
      <div className="mb-24">
        <h2 className="font-display font-bold text-2xl text-center mb-10 text-muted-foreground flex items-center justify-center gap-4">
          <div className="h-px bg-border flex-1" />
          Organizing Committee
          <div className="h-px bg-border flex-1" />
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {organizingCommittee.map((m) => (
            <MemberCard key={m.name} {...m} title={m.role} role={null} color="cyber-blue" />
          ))}
        </div>
      </div>

      {/* Faculty Coordinators */}
      <div className="mb-24">
        <h2 className="font-display font-bold text-2xl text-center mb-10 text-muted-foreground flex items-center justify-center gap-4">
          <div className="h-px bg-border flex-1" />
          Faculty Coordinators
          <div className="h-px bg-border flex-1" />
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {facultyCoordinators.map((c) => (
            <MemberCard key={c.name} {...c} role="Faculty Coordinator" color="terminal-green" icon={GraduationCap} />
          ))}
        </div>
      </div>

      {/* Student Coordinators */}
      <div className="mb-16">
        <h2 className="font-display font-bold text-2xl text-center mb-10 text-muted-foreground flex items-center justify-center gap-4">
          <div className="h-px bg-border flex-1" />
          Student Coordinators
          <div className="h-px bg-border flex-1" />
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
          {studentCoordinators.map((s) => (
            <motion.div
              key={s.name}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="surface-card p-4 flex flex-col justify-between border-secondary/20 hover:border-secondary/50 transition-colors"
            >
              <div>
                <p className="text-sm font-semibold text-foreground">{s.name}</p>
                {s.title && <p className="text-[10px] text-secondary font-medium uppercase tracking-wider">{s.title}</p>}
              </div>
              {s.phone && (
                <div className="flex items-center gap-1.5 mt-2 text-[11px] text-muted-foreground hover:text-secondary transition-colors cursor-pointer">
                  <Phone className="w-2.5 h-2.5" />
                  <span>{s.phone}</span>
                </div>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </div>

    <Footer />
  </div>
);

export default Committee;
