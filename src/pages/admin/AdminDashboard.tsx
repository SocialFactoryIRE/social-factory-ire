import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Inbox, FileText, PenSquare, Users } from "lucide-react";
import { format } from "date-fns";

interface Stats {
  leads: number;
  blogPosts: number;
  pages: number;
  users: number;
}

export default function AdminDashboard() {
  const [stats, setStats] = useState<Stats>({ leads: 0, blogPosts: 0, pages: 0, users: 0 });
  const [recentLeads, setRecentLeads] = useState<any[]>([]);

  useEffect(() => {
    const fetchStats = async () => {
      const [leadsRes, blogRes, pagesRes, usersRes, recentRes] = await Promise.all([
        supabase.from("admin_leads").select("id", { count: "exact", head: true }),
        supabase.from("blog_posts").select("id", { count: "exact", head: true }),
        supabase.from("cms_pages").select("id", { count: "exact", head: true }),
        supabase.from("user_roles").select("id", { count: "exact", head: true }),
        supabase.from("admin_leads").select("*").order("created_at", { ascending: false }).limit(5),
      ]);
      setStats({
        leads: leadsRes.count ?? 0,
        blogPosts: blogRes.count ?? 0,
        pages: pagesRes.count ?? 0,
        users: usersRes.count ?? 0,
      });
      setRecentLeads(recentRes.data ?? []);
    };
    fetchStats();
  }, []);

  const statCards = [
    { label: "Total Leads", value: stats.leads, icon: Inbox, color: "text-blue-500" },
    { label: "Blog Posts", value: stats.blogPosts, icon: PenSquare, color: "text-green-500" },
    { label: "Pages", value: stats.pages, icon: FileText, color: "text-purple-500" },
    { label: "Users", value: stats.users, icon: Users, color: "text-orange-500" },
  ];

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-foreground">Dashboard</h2>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {statCards.map((s) => (
          <Card key={s.label}>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">{s.label}</CardTitle>
              <s.icon className={`h-5 w-5 ${s.color}`} />
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold">{s.value}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Recent Leads</CardTitle>
        </CardHeader>
        <CardContent>
          {recentLeads.length === 0 ? (
            <p className="text-muted-foreground text-sm">No leads yet.</p>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Date</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {recentLeads.map((lead) => (
                  <TableRow key={lead.id}>
                    <TableCell className="font-medium">{lead.name}</TableCell>
                    <TableCell>{lead.email}</TableCell>
                    <TableCell>
                      <Badge variant={lead.status === "new" ? "default" : lead.status === "contacted" ? "secondary" : "outline"}>
                        {lead.status}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-muted-foreground">{format(new Date(lead.created_at), "MMM d, yyyy")}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
