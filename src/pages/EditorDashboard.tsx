import { useState, useEffect } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { motion } from "framer-motion";
import { Users, FileText, Download, Filter, Search, Loader2, Edit, Trash2, Check, X, Flag } from "lucide-react";
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
  DialogFooter,
} from "@/components/ui/dialog";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { Label } from "@/components/ui/label";

const EditorDashboard = () => {
  const [hackathonTeams, setHackathonTeams] = useState<any[]>([]);
  const [bootcampParticipants, setBootcampParticipants] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [editingRecord, setEditingRecord] = useState<any>(null);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  
  const { toast } = useToast();

  useEffect(() => {
    fetchAllData();
  }, []);

  const fetchAllData = async () => {
    try {
      console.log("Fetching all registration data...");
      setIsLoading(true);
      const { data, error } = await (supabase as any)
        .from('registrations')
        .select('*')
        .order('created_at', { ascending: true });

      if (error) throw error;
      
      const records = data || [];
      console.log(`Fetched ${records.length} records total.`);
      setHackathonTeams(records.filter((r: any) => r.intent === 'hackathon'));
      setBootcampParticipants(records.filter((r: any) => r.intent === 'bootcamp'));
    } catch (error: any) {
      console.error("Fetch error:", error.message);
      toast({ title: "Error", description: error.message, variant: "destructive" });
    } finally {
      setIsLoading(false);
    }
  };

  const handleEdit = (record: any) => {
    console.log("Opening edit modal for:", record.id);
    setEditingRecord({ ...record });
    setIsEditModalOpen(true);
  };

  const handleDeleteClick = (id: string) => {
    console.log("Opening delete confirmation for:", id);
    setDeletingId(id);
    setIsDeleteModalOpen(true);
  };

  const confirmDelete = async () => {
    if (!deletingId) return;
    
    try {
      console.log("Executing delete for ID:", deletingId);
      setIsProcessing(true);
      
      // We use .select() here to confirm if a row was actually deleted
      const { data, error, status } = await (supabase as any)
        .from('registrations')
        .delete()
        .eq('id', deletingId)
        .select();

      console.log("Supabase response status:", status);
      console.log("Supabase response data:", data);

      if (error) throw error;
      
      if (!data || data.length === 0) {
        console.warn("Delete appeared successful but no rows were removed. This is often an RLS policy issue.");
        toast({ 
          title: "Action Restricted", 
          description: "The database blocked this deletion. Please ensure SQL policies are applied.",
          variant: "destructive"
        });
      } else {
        console.log("Delete successful. Rows removed:", data.length);
        // Optimistic update
        setHackathonTeams(prev => prev.filter(t => t.id !== deletingId));
        setBootcampParticipants(prev => prev.filter(p => p.id !== deletingId));
        toast({ title: "Deleted", description: "Registration removed successfully." });
      }
      
      setIsDeleteModalOpen(false);
      setDeletingId(null);
      await fetchAllData();
    } catch (error: any) {
      console.error("Delete exception:", error);
      toast({ title: "Delete failed", description: error.message, variant: "destructive" });
    } finally {
      setIsProcessing(false);
    }
  };

  const handleSaveEdit = async () => {
    if (!editingRecord) return;
    
    try {
      console.log("Saving edits for:", editingRecord.id);
      setIsProcessing(true);
      const { id, ...updates } = editingRecord;
      const { error } = await (supabase as any)
        .from('registrations')
        .update(updates)
        .eq('id', id);

      if (error) throw error;
      
      console.log("Edit successful.");
      toast({ title: "Success", description: "Record updated successfully." });
      setIsEditModalOpen(false);
      fetchAllData();
    } catch (error: any) {
      console.error("Update error:", error.message);
      toast({ title: "Update failed", description: error.message, variant: "destructive" });
    } finally {
      setIsProcessing(false);
    }
  };

  const filterList = (list: any[]) => {
    if (!searchTerm) return list;
    const term = searchTerm.toLowerCase();
    return list.filter(item => {
      const match = (item.team_name || "").toLowerCase().includes(term) ||
        (item.full_name || "").toLowerCase().includes(term) ||
        (item.team_lead_name || "").toLowerCase().includes(term) ||
        (item.email || "").toLowerCase().includes(term) ||
        (item.team_lead_email || "").toLowerCase().includes(term) ||
        (item.roll_number || "").toLowerCase().includes(term) ||
        (item.team_lead_roll || "").toLowerCase().includes(term);
      return match;
    });
  };

  const exportToCSV = (list: any[], type: string) => {
    const isHackathon = type === "hackathon";
    const headers = isHackathon 
      ? ["Team Name", "Lead Name", "Lead Email", "Lead Roll", "Member 2", "Member 2 Email", "Member 2 Roll", "Member 3", "Member 3 Email", "Member 3 Roll", "Reg Date"]
      : ["Full Name", "Email", "Phone", "Roll Number", "Dept", "Course", "Year", "Reg Date"];

    const rows = list.map(item => {
      if (isHackathon) {
        return [item.team_name, item.team_lead_name, item.team_lead_email, item.team_lead_roll, item.member2_name, item.member2_email, item.member2_roll, item.member3_name, item.member3_email, item.member3_roll, new Date(item.created_at).toLocaleString()];
      } else {
        return [item.full_name, item.email, item.phone, item.roll_number, item.department, item.course, item.year, new Date(item.created_at).toLocaleString()];
      }
    });

    const csvContent = [headers.join(","), ...rows.map(r => r.map(c => `"${(c || "").toString().replace(/"/g, '""')}"`).join(","))].join("\n");
    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `isea_${type}_data_${new Date().toISOString().split('T')[0]}.csv`;
    a.click();
  };

  return (
    <div className="min-h-screen bg-transparent">
      <Navbar />
      <main className="pt-24 pb-16 container mx-auto px-4">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
            <div>
              <h1 className="font-display font-bold text-3xl md:text-4xl">Editor <span className="text-primary">Dashboard</span></h1>
              <p className="text-muted-foreground">Comprehensive overview and management of all event registrations.</p>
            </div>
            <div className="flex items-center gap-3">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input 
                  placeholder="Universal search..." 
                  className="pl-10 w-64 bg-background border-border"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <Button variant="outline" size="icon" onClick={fetchAllData} disabled={isLoading}>
                <Loader2 className={`h-4 w-4 ${isLoading ? 'animate-spin' : ''}`} />
              </Button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
            <Card className="surface-card border-secondary/20 bg-secondary/5">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium flex justify-between">
                  Hackathon Teams (Admin@1234)
                  <Button variant="ghost" size="sm" onClick={() => exportToCSV(hackathonTeams, 'hackathon')} className="h-6 px-2"><Download className="h-3 w-3 mr-1" />CSV</Button>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-secondary">{hackathonTeams.length}</div>
              </CardContent>
            </Card>
            <Card className="surface-card border-primary/20 bg-primary/5">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium flex justify-between">
                  Bootcamp Participants (Admin@123)
                  <Button variant="ghost" size="sm" onClick={() => exportToCSV(bootcampParticipants, 'bootcamp')} className="h-6 px-2"><Download className="h-3 w-3 mr-1" />CSV</Button>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-primary">{bootcampParticipants.length}</div>
              </CardContent>
            </Card>
          </div>

          {/* Hackathon Table */}
          <div className="mb-12">
            <h2 className="text-xl font-bold mb-4 flex items-center gap-2 text-secondary">
              <Flag className="h-5 w-5" /> Hackathon Registrations
            </h2>
            <div className="surface-card rounded-md border border-border overflow-hidden">
              <Table>
                <TableHeader className="bg-muted/50">
                  <TableRow>
                    <TableHead>Team Name</TableHead>
                    <TableHead>Lead</TableHead>
                    <TableHead>Members</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filterList(hackathonTeams).length > 0 ? (
                    filterList(hackathonTeams).map((team) => (
                      <TableRow key={team.id} className="hover:bg-muted/30">
                        <TableCell className="font-bold">{team.team_name}</TableCell>
                        <TableCell>
                          <div className="text-sm font-medium">{team.team_lead_name}</div>
                          <div className="text-xs text-muted-foreground">{team.team_lead_email}</div>
                        </TableCell>
                        <TableCell>
                          <div className="flex flex-col gap-0.5 text-xs text-muted-foreground">
                            {team.member2_name && <span>M2: {team.member2_name} ({team.member2_roll})</span>}
                            {team.member3_name && <span>M3: {team.member3_name} ({team.member3_roll})</span>}
                          </div>
                        </TableCell>
                        <TableCell className="text-xs text-muted-foreground">{new Date(team.created_at).toLocaleDateString()}</TableCell>
                        <TableCell className="text-right">
                          <div className="flex justify-end gap-2">
                            <Button variant="ghost" size="icon" className="h-8 w-8 text-blue-400" onClick={() => handleEdit(team)}><Edit className="h-4 w-4" /></Button>
                            <Button variant="ghost" size="icon" className="h-8 w-8 text-red-400" onClick={() => handleDeleteClick(team.id)}><Trash2 className="h-4 w-4" /></Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))
                  ) : (
                    <TableRow>
                      <TableCell colSpan={5} className="text-center py-10 text-muted-foreground">No registrations found.</TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </div>
          </div>

          {/* Bootcamp Table */}
          <div>
            <h2 className="text-xl font-bold mb-4 flex items-center gap-2 text-primary">
              <Users className="h-5 w-5" /> Bootcamp Registrations
            </h2>
            <div className="surface-card rounded-md border border-border overflow-hidden">
              <Table>
                <TableHeader className="bg-muted/50">
                  <TableRow>
                    <TableHead>Participant</TableHead>
                    <TableHead>Academic Info</TableHead>
                    <TableHead>Contact</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filterList(bootcampParticipants).length > 0 ? (
                    filterList(bootcampParticipants).map((user) => (
                      <TableRow key={user.id} className="hover:bg-muted/30">
                        <TableCell className="font-bold">{user.full_name}</TableCell>
                        <TableCell>
                          <div className="text-xs">{user.roll_number}</div>
                          <div className="text-[10px] text-muted-foreground uppercase">{user.course} - {user.department}</div>
                        </TableCell>
                        <TableCell>
                          <div className="text-xs text-muted-foreground underline">{user.email}</div>
                          <div className="text-xs text-muted-foreground">{user.phone}</div>
                        </TableCell>
                        <TableCell className="text-xs text-muted-foreground">{new Date(user.created_at).toLocaleDateString()}</TableCell>
                        <TableCell className="text-right">
                          <div className="flex justify-end gap-2">
                            <Button variant="ghost" size="icon" className="h-8 w-8 text-blue-400" onClick={() => handleEdit(user)}><Edit className="h-4 w-4" /></Button>
                            <Button variant="ghost" size="icon" className="h-8 w-8 text-red-400" onClick={() => handleDeleteClick(user.id)}><Trash2 className="h-4 w-4" /></Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))
                  ) : (
                    <TableRow>
                      <TableCell colSpan={5} className="text-center py-10 text-muted-foreground">No registrations found.</TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </div>
          </div>
        </motion.div>
      </main>

      <Dialog open={isEditModalOpen} onOpenChange={setIsEditModalOpen}>
        <DialogContent className="max-w-xl bg-card border-border overflow-y-auto max-h-[90vh]">
          <DialogHeader>
            <DialogTitle>Edit Registration Details</DialogTitle>
            <DialogDescription>Modify information for {editingRecord?.team_name || editingRecord?.full_name}</DialogDescription>
          </DialogHeader>
          
          {editingRecord && (
            <div className="space-y-4 py-4">
              {editingRecord.intent === 'hackathon' ? (
                <>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label>Team Name</Label>
                      <Input value={editingRecord.team_name} onChange={e => setEditingRecord({...editingRecord, team_name: e.target.value})} />
                    </div>
                  </div>
                  <h4 className="font-bold text-sm text-secondary mt-4 border-b pb-1">Team Lead</h4>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label>Lead Name</Label>
                      <Input value={editingRecord.team_lead_name} onChange={e => setEditingRecord({...editingRecord, team_lead_name: e.target.value})} />
                    </div>
                    <div className="space-y-2">
                      <Label>Lead Email</Label>
                      <Input value={editingRecord.team_lead_email} onChange={e => setEditingRecord({...editingRecord, team_lead_email: e.target.value})} />
                    </div>
                    <div className="space-y-2">
                      <Label>Lead Roll</Label>
                      <Input value={editingRecord.team_lead_roll} onChange={e => setEditingRecord({...editingRecord, team_lead_roll: e.target.value})} />
                    </div>
                  </div>
                  
                  <h4 className="font-bold text-sm text-terminal-green mt-4 border-b pb-1">Member 2</h4>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label>M2 Name</Label>
                      <Input value={editingRecord.member2_name} onChange={e => setEditingRecord({...editingRecord, member2_name: e.target.value})} />
                    </div>
                    <div className="space-y-2">
                      <Label>M2 Email</Label>
                      <Input value={editingRecord.member2_email} onChange={e => setEditingRecord({...editingRecord, member2_email: e.target.value})} />
                    </div>
                    <div className="space-y-2">
                      <Label>M2 Roll</Label>
                      <Input value={editingRecord.member2_roll} onChange={e => setEditingRecord({...editingRecord, member2_roll: e.target.value})} />
                    </div>
                  </div>
                  
                  <h4 className="font-bold text-sm text-primary mt-4 border-b pb-1">Member 3</h4>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label>M3 Name</Label>
                      <Input value={editingRecord.member3_name} onChange={e => setEditingRecord({...editingRecord, member3_name: e.target.value})} />
                    </div>
                    <div className="space-y-2">
                      <Label>M3 Email</Label>
                      <Input value={editingRecord.member3_email} onChange={e => setEditingRecord({...editingRecord, member3_email: e.target.value})} />
                    </div>
                    <div className="space-y-2">
                      <Label>M3 Roll</Label>
                      <Input value={editingRecord.member3_roll} onChange={e => setEditingRecord({...editingRecord, member3_roll: e.target.value})} />
                    </div>
                  </div>
                </>
              ) : (
                <>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label>Full Name</Label>
                      <Input value={editingRecord.full_name} onChange={e => setEditingRecord({...editingRecord, full_name: e.target.value})} />
                    </div>
                    <div className="space-y-2">
                      <Label>Email</Label>
                      <Input value={editingRecord.email} onChange={e => setEditingRecord({...editingRecord, email: e.target.value})} />
                    </div>
                    <div className="space-y-2">
                      <Label>Roll Number</Label>
                      <Input value={editingRecord.roll_number} onChange={e => setEditingRecord({...editingRecord, roll_number: e.target.value})} />
                    </div>
                    <div className="space-y-2">
                      <Label>Phone</Label>
                      <Input value={editingRecord.phone} onChange={e => setEditingRecord({...editingRecord, phone: e.target.value})} />
                    </div>
                  </div>
                </>
              )}
            </div>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsEditModalOpen(false)}>Cancel</Button>
            <Button onClick={handleSaveEdit}>Save Changes</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Dialog open={isDeleteModalOpen} onOpenChange={setIsDeleteModalOpen}>
        <DialogContent className="max-w-md bg-card border-border">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2 text-red-500">
              <Trash2 className="h-5 w-5" /> Confirm Deletion
            </DialogTitle>
            <DialogDescription>
              Are you sure you want to delete this registration? This action is permanent and cannot be undone.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter className="gap-2 sm:gap-0">
            <Button variant="outline" onClick={() => setIsDeleteModalOpen(false)} disabled={isProcessing}>Cancel</Button>
            <Button variant="destructive" onClick={confirmDelete} disabled={isProcessing}>
              {isProcessing ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
              Delete Permanently
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      <Footer />
    </div>
  );
};

export default EditorDashboard;
