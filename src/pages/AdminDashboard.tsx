import { useState, useEffect } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { motion } from "framer-motion";
import { Users, FileText, Download, Filter, Search, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { supabase } from "@/integrations/supabase/client";
import { useSearchParams, useNavigate } from "react-router-dom";

const AdminDashboard = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [teams, setTeams] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedTeam, setSelectedTeam] = useState<any>(null);
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const type = searchParams.get("type") || "hackathon"; // default to hackathon
  const isHackathonAdmin = type === "hackathon";

  useEffect(() => {
    fetchRegistrations();
  }, [type]);

  const fetchRegistrations = async () => {
    try {
      setIsLoading(true);
      const { data, error } = await (supabase as any)
        .from('registrations')
        .select('*')
        .eq('intent', type)
        .order('created_at', { ascending: true });

      if (error) throw error;
      setTeams(data || []);
    } catch (error: any) {
      console.error("Error fetching registrations:", error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const filteredTeams = teams.filter(team => 
    (isHackathonAdmin ? (team.team_name || "") : (team.full_name || "")).toLowerCase().includes(searchTerm.toLowerCase()) ||
    (isHackathonAdmin ? (team.team_lead_name || "") : (team.full_name || "")).toLowerCase().includes(searchTerm.toLowerCase()) ||
    (isHackathonAdmin ? (team.team_lead_email || "") : (team.email || "")).toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleExportCSV = () => {
    const headers = isHackathonAdmin 
      ? ["Team Name", "Lead Name", "Lead Email", "Lead Roll", "Member 2", "Member 2 Email", "Member 2 Roll", "Member 3", "Member 3 Email", "Member 3 Roll", "Registration Date & Time"]
      : ["Full Name", "Email", "Phone", "Roll Number", "Department", "Course", "Year", "Registration Date & Time"];

    const rows = filteredTeams.map(team => {
      if (isHackathonAdmin) {
        return [
          team.team_name,
          team.team_lead_name,
          team.team_lead_email,
          team.team_lead_roll,
          team.member2_name,
          team.member2_email,
          team.member2_roll,
          team.member3_name,
          team.member3_email,
          team.member3_roll,
          new Date(team.created_at).toLocaleString()
        ];
      } else {
        return [
          team.full_name,
          team.email,
          team.phone,
          team.roll_number,
          team.department,
          team.course,
          team.year || "N/A",
          new Date(team.created_at).toLocaleString()
        ];
      }
    });

    const csvContent = [
      headers.join(","),
      ...rows.map(row => row.map(cell => `"${(cell || "").toString().replace(/"/g, '""')}"`).join(","))
    ].join("\n");

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.setAttribute("href", url);
    link.setAttribute("download", `isea_2026_${type}_registrations_${new Date().toISOString().split('T')[0]}.csv`);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="min-h-screen bg-transparent text-foreground">
      <Navbar />
      
      <main className="pt-24 pb-16 container mx-auto px-4">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
            <div>
              <div className="flex items-center gap-3 mb-2">
                <h1 className="font-display font-bold text-3xl md:text-4xl">
                  {isHackathonAdmin ? "Hackathon" : "Bootcamp"} <span className={isHackathonAdmin ? "text-secondary" : "text-primary"}>Dashboard</span>
                </h1>
              </div>
              <p className="text-muted-foreground">Manage and view all registered {isHackathonAdmin ? "teams" : "participants"} for ISEA JNTUK - 2026 {isHackathonAdmin ? "Hackathon" : "Bootcamp"}</p>
            </div>
            <div className="flex items-center gap-3">
              <Button variant="outline" className="gap-2" onClick={handleExportCSV}>
                <Download className="h-4 w-4" /> Export CSV
              </Button>
              <Button variant="cyber" className="gap-2">
                <Filter className="h-4 w-4" /> Filter
              </Button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <Card className={`surface-card border-${isHackathonAdmin ? 'secondary' : 'primary'}/20 bg-${isHackathonAdmin ? 'secondary' : 'primary'}/5`}>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium">Total {isHackathonAdmin ? "Teams" : "Students"}</CardTitle>
                <Users className={`h-4 w-4 text-${isHackathonAdmin ? 'secondary' : 'primary'}`} />
              </CardHeader>
              <CardContent>
                <div className={`text-3xl font-bold text-${isHackathonAdmin ? 'secondary' : 'primary'}`}>{teams.length}</div>
                <p className="text-xs text-muted-foreground mt-1">{isHackathonAdmin ? "Hackathon" : "Bootcamp"} exclusive</p>
              </CardContent>
            </Card>
            
            <Card className={`surface-card border-${isHackathonAdmin ? 'primary' : 'secondary'}/20 bg-${isHackathonAdmin ? 'primary' : 'secondary'}/5`}>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium">Total {isHackathonAdmin ? "Hackathon Participants" : "Registration Rate"}</CardTitle>
                <Users className={`h-4 w-4 text-${isHackathonAdmin ? 'primary' : 'secondary'}`} />
              </CardHeader>
              <CardContent>
                <div className={`text-3xl font-bold text-${isHackathonAdmin ? 'primary' : 'secondary'}`}>
                  {isHackathonAdmin 
                    ? teams.reduce((acc, team) => 1 + (team.member2_name ? 1 : 0) + (team.member3_name ? 1 : 0) + acc, 0)
                    : "100%"
                  }
                </div>
                <p className="text-xs text-muted-foreground mt-1">{isHackathonAdmin ? "Leads + Members" : "Confirmed slots"}</p>
              </CardContent>
            </Card>

            <Card className="surface-card border-terminal-green/20 bg-terminal-green/5">
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium">Data Source</CardTitle>
                <FileText className="h-4 w-4 text-terminal-green" />
              </CardHeader>
              <CardContent>
                <div className="text-xl font-bold text-terminal-green">Live Database</div>
                <p className="text-xs text-muted-foreground mt-1">ISEA JNTUK - 2026 {type.toUpperCase()}</p>
              </CardContent>
            </Card>
          </div>

          <div className="surface-card p-6">
            <div className="flex items-center gap-4 mb-6">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input 
                  placeholder="Search teams, leads, or emails..." 
                  className="pl-10 bg-background border-border"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <Button variant="outline" size="icon" onClick={fetchRegistrations} disabled={isLoading}>
                <Loader2 className={`h-4 w-4 ${isLoading ? 'animate-spin' : ''}`} />
              </Button>
            </div>

            <div className="rounded-md border border-border overflow-hidden">
              <Table>
                <TableHeader className="bg-muted/50">
                  <TableRow>
                    <TableHead className="font-bold">{isHackathonAdmin ? "Team Name" : "Participant Name"}</TableHead>
                    <TableHead className="font-bold">{isHackathonAdmin ? "Team Lead" : "Roll Number"}</TableHead>
                    <TableHead className="font-bold">Email</TableHead>
                    <TableHead className="font-bold">{isHackathonAdmin ? "Members" : "Details"}</TableHead>
                    <TableHead className="font-bold text-right">Reg. Date & Time</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {isLoading ? (
                    <TableRow>
                      <TableCell colSpan={5} className="h-32 text-center">
                        <Loader2 className="h-8 w-8 animate-spin mx-auto text-primary" />
                        <p className="mt-2 text-muted-foreground">Loading {type} registrations...</p>
                      </TableCell>
                    </TableRow>
                  ) : filteredTeams.length > 0 ? (
                    filteredTeams.map((team) => (
                      <TableRow 
                        key={team.id} 
                        className="hover:bg-muted/30 transition-colors cursor-pointer"
                        onClick={() => {
                          setSelectedTeam(team);
                          setIsModalOpen(true);
                        }}
                      >
                        <TableCell className={`font-semibold text-${isHackathonAdmin ? 'secondary' : 'primary'}`}>
                          {isHackathonAdmin ? team.team_name : team.full_name}
                        </TableCell>
                        <TableCell>{isHackathonAdmin ? team.team_lead_name : team.roll_number}</TableCell>
                        <TableCell className="text-muted-foreground">{isHackathonAdmin ? team.team_lead_email : team.email}</TableCell>
                        <TableCell>
                          <div className="flex flex-col gap-1">
                            {isHackathonAdmin ? (
                              <>
                                {team.member2_name && (
                                  <span className="text-xs bg-muted text-muted-foreground px-2 py-0.5 rounded-full w-fit">
                                    M2: {team.member2_name}
                                  </span>
                                )}
                                {team.member3_name && (
                                  <span className="text-xs bg-muted text-muted-foreground px-2 py-0.5 rounded-full w-fit">
                                    M3: {team.member3_name}
                                  </span>
                                )}
                                {!team.member2_name && !team.member3_name && (
                                  <span className="text-xs text-muted-foreground italic">Lead Only</span>
                                )}
                              </>
                            ) : (
                              <div className="flex flex-col gap-0.5">
                                <span className="text-xs bg-muted text-muted-foreground px-2 py-0.5 rounded-full w-fit">
                                  {team.course} - {team.department}
                                </span>
                                <span className="text-xs text-muted-foreground px-2">
                                  Ph: {team.phone}
                                </span>
                              </div>
                            )}
                          </div>
                        </TableCell>
                        <TableCell className="text-right text-muted-foreground tabular-nums">
                          {new Date(team.created_at).toLocaleString()}
                        </TableCell>
                      </TableRow>
                    ))
                  ) : (
                    <TableRow>
                      <TableCell colSpan={5} className="h-24 text-center text-muted-foreground">
                        No {type} teams/participants found.
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </div>
          </div>
        </motion.div>
      </main>

      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent className="max-w-2xl bg-card border-border overflow-y-auto max-h-[90vh]">
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold flex items-center gap-3">
              {isHackathonAdmin ? "Team Details" : "Participant Details"}
            </DialogTitle>
            <DialogDescription>
              Detailed registration information for {isHackathonAdmin ? selectedTeam?.team_name : selectedTeam?.full_name}
            </DialogDescription>
          </DialogHeader>

          {selectedTeam && (
            <div className="space-y-6 py-4">
              {isHackathonAdmin ? (
                <>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <p className="text-xs text-muted-foreground uppercase font-semibold">Team Name</p>
                      <p className="text-secondary font-bold text-lg">{selectedTeam.team_name}</p>
                    </div>
                    <div className="space-y-1 text-right">
                      <p className="text-xs text-muted-foreground uppercase font-semibold">Reg. Date & Time</p>
                      <p className="font-medium">{new Date(selectedTeam.created_at).toLocaleString()}</p>
                    </div>
                  </div>

                  <div className="surface-card p-4 border-secondary/20 bg-secondary/5 rounded-lg space-y-3">
                    <h4 className="font-bold text-secondary flex items-center gap-2 border-b border-secondary/10 pb-2">
                      Member 1 (Team Lead)
                    </h4>
                    <div className="grid grid-cols-2 gap-y-3 gap-x-4 text-sm">
                      <div><p className="text-xs text-muted-foreground">Full Name</p><p className="font-medium">{selectedTeam.team_lead_name || selectedTeam.full_name}</p></div>
                      <div><p className="text-xs text-muted-foreground">Roll Number</p><p className="font-medium">{selectedTeam.team_lead_roll || selectedTeam.roll_number}</p></div>
                      <div className="col-span-2"><p className="text-xs text-muted-foreground">Email Address</p><p className="font-medium">{selectedTeam.team_lead_email || selectedTeam.email}</p></div>
                    </div>
                  </div>

                  {selectedTeam.member2_name && (
                    <div className="surface-card p-4 border-muted/20 bg-muted/5 rounded-lg space-y-3">
                      <h4 className="font-bold text-foreground/80 flex items-center gap-2 border-b border-border pb-2">Member 2</h4>
                      <div className="grid grid-cols-2 gap-y-3 gap-x-4 text-sm">
                        <div><p className="text-xs text-muted-foreground">Full Name</p><p className="font-medium">{selectedTeam.member2_name}</p></div>
                        <div><p className="text-xs text-muted-foreground">Roll Number</p><p className="font-medium">{selectedTeam.member2_roll}</p></div>
                        <div className="col-span-2"><p className="text-xs text-muted-foreground">Email Address</p><p className="font-medium">{selectedTeam.member2_email}</p></div>
                      </div>
                    </div>
                  )}

                  {selectedTeam.member3_name && (
                    <div className="surface-card p-4 border-muted/20 bg-muted/5 rounded-lg space-y-3">
                      <h4 className="font-bold text-foreground/80 flex items-center gap-2 border-b border-border pb-2">Member 3</h4>
                      <div className="grid grid-cols-2 gap-y-3 gap-x-4 text-sm">
                        <div><p className="text-xs text-muted-foreground">Full Name</p><p className="font-medium">{selectedTeam.member3_name}</p></div>
                        <div><p className="text-xs text-muted-foreground">Roll Number</p><p className="font-medium">{selectedTeam.member3_roll}</p></div>
                        <div className="col-span-2"><p className="text-xs text-muted-foreground">Email Address</p><p className="font-medium">{selectedTeam.member3_email}</p></div>
                      </div>
                    </div>
                  )}
                </>
              ) : (
                <>
                  <div className="grid grid-cols-2 gap-x-8 gap-y-6">
                    <div className="space-y-1">
                      <p className="text-xs text-muted-foreground uppercase font-semibold">Full Name</p>
                      <p className="text-primary font-bold text-xl">{selectedTeam.full_name}</p>
                    </div>
                    <div className="space-y-1 text-right">
                      <p className="text-xs text-muted-foreground uppercase font-semibold">Reg. Date & Time</p>
                      <p className="text-sm font-medium">{new Date(selectedTeam.created_at).toLocaleString()}</p>
                    </div>
                    
                    <div className="space-y-1">
                      <p className="text-xs text-muted-foreground uppercase font-semibold">Email ID</p>
                      <p className="font-medium">{selectedTeam.email}</p>
                    </div>
                    <div className="space-y-1 text-right">
                      <p className="text-xs text-muted-foreground uppercase font-semibold">Mobile Number</p>
                      <p className="font-medium">{selectedTeam.phone}</p>
                    </div>

                    <div className="space-y-1">
                      <p className="text-xs text-muted-foreground uppercase font-semibold">Roll Number</p>
                      <p className="font-medium">{selectedTeam.roll_number}</p>
                    </div>
                    <div className="space-y-1 text-right">
                      <p className="text-xs text-muted-foreground uppercase font-semibold">Department</p>
                      <p className="font-medium">{selectedTeam.department}</p>
                    </div>

                    <div className="space-y-1">
                      <p className="text-xs text-muted-foreground uppercase font-semibold">Course</p>
                      <p className="font-medium">{selectedTeam.course}</p>
                    </div>
                    <div className="space-y-1 text-right">
                      <p className="text-xs text-muted-foreground uppercase font-semibold">Year of Study</p>
                      <p className="font-medium">{selectedTeam.year || "N/A"}</p>
                    </div>
                  </div>
                  
                  <div className="mt-8 p-4 bg-primary/5 border border-primary/20 rounded-lg text-center">
                    <p className="text-xs text-muted-foreground">Database ID: {selectedTeam.id}</p>
                  </div>
                </>
              )}
            </div>
          )}
        </DialogContent>
      </Dialog>

      <Footer />
    </div>
  );
};

export default AdminDashboard;
