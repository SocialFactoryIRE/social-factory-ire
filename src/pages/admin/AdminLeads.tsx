import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { format } from "date-fns";
import { Trash2, CheckCircle } from "lucide-react";
import { useAdminAuth } from "@/hooks/useAdminAuth";

export default function AdminLeads() {
  const [leads, setLeads] = useState<any[]>([]);
  const { toast } = useToast();
  const { role } = useAdminAuth();

  const fetchLeads = async () => {
    const { data } = await supabase.from("admin_leads").select("*").order("created_at", { ascending: false });
    setLeads(data ?? []);
  };

  useEffect(() => { fetchLeads(); }, []);

  const markContacted = async (id: string) => {
    const { error } = await supabase.from("admin_leads").update({ status: "contacted" }).eq("id", id);
    if (error) toast({ title: "Error", description: error.message, variant: "destructive" });
    else fetchLeads();
  };

  const deleteLead = async (id: string) => {
    const { error } = await supabase.from("admin_leads").delete().eq("id", id);
    if (error) toast({ title: "Error", description: error.message, variant: "destructive" });
    else fetchLeads();
  };

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-foreground">Leads / Enquiries</h2>
      <Card>
        <CardHeader><CardTitle>All Leads</CardTitle></CardHeader>
        <CardContent>
          {leads.length === 0 ? (
            <p className="text-muted-foreground text-sm">No leads yet.</p>
          ) : (
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead>Email</TableHead>
                    <TableHead>Phone</TableHead>
                    <TableHead>Message</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {leads.map((lead) => (
                    <TableRow key={lead.id}>
                      <TableCell className="font-medium">{lead.name}</TableCell>
                      <TableCell>{lead.email}</TableCell>
                      <TableCell>{lead.phone || "—"}</TableCell>
                      <TableCell className="max-w-xs truncate">{lead.message || "—"}</TableCell>
                      <TableCell>
                        <Badge variant={lead.status === "new" ? "default" : lead.status === "contacted" ? "secondary" : "outline"}>
                          {lead.status}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-muted-foreground">{format(new Date(lead.created_at), "MMM d, yyyy")}</TableCell>
                      <TableCell>
                        <div className="flex gap-1">
                          {lead.status === "new" && (
                            <Button variant="ghost" size="icon" onClick={() => markContacted(lead.id)} title="Mark contacted">
                              <CheckCircle className="h-4 w-4 text-green-500" />
                            </Button>
                          )}
                          {role === "admin" && (
                            <Button variant="ghost" size="icon" onClick={() => deleteLead(lead.id)} title="Delete">
                              <Trash2 className="h-4 w-4 text-destructive" />
                            </Button>
                          )}
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
