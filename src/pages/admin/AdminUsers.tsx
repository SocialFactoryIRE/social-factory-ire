import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { useToast } from "@/hooks/use-toast";
import { useAdminAuth } from "@/hooks/useAdminAuth";
import { Plus, Trash2 } from "lucide-react";
import { format } from "date-fns";

export default function AdminUsers() {
  const [users, setUsers] = useState<any[]>([]);
  const [open, setOpen] = useState(false);
  const [newUser, setNewUser] = useState({ email: "", password: "", role: "editor" as "admin" | "editor", display_name: "" });
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();
  const { role } = useAdminAuth();

  const fetchUsers = async () => {
    const { data } = await supabase.from("user_roles").select("*");
    if (!data || data.length === 0) { setUsers([]); return; }

    const userIds = data.map((r: any) => r.user_id);
    const { data: profiles } = await supabase.rpc("get_display_names", { user_ids: userIds });

    const merged = data.map((r: any) => {
      const profile = profiles?.find((p: any) => p.user_id === r.user_id);
      return { ...r, display_name: profile?.display_name || "Unknown" };
    });
    setUsers(merged);
  };

  useEffect(() => { fetchUsers(); }, []);

  const handleCreate = async () => {
    if (!newUser.email.trim() || !newUser.password.trim()) {
      toast({ title: "Validation", description: "Email and password are required.", variant: "destructive" });
      return;
    }
    if (newUser.password.length < 8) {
      toast({ title: "Validation", description: "Password must be at least 8 characters.", variant: "destructive" });
      return;
    }

    setLoading(true);
    // Sign up user via auth, then add role
    const { data: signUpData, error: signUpError } = await supabase.auth.signUp({
      email: newUser.email.trim(),
      password: newUser.password,
      options: { data: { display_name: newUser.display_name || newUser.email } },
    });
    if (signUpError) {
      toast({ title: "Error", description: signUpError.message, variant: "destructive" });
      setLoading(false);
      return;
    }

    if (signUpData.user) {
      const { error: roleError } = await supabase.from("user_roles").insert({
        user_id: signUpData.user.id,
        role: newUser.role,
      });
      if (roleError) {
        toast({ title: "Role Error", description: roleError.message, variant: "destructive" });
      }
    }

    setLoading(false);
    setOpen(false);
    setNewUser({ email: "", password: "", role: "editor", display_name: "" });
    fetchUsers();
    toast({ title: "User created", description: "The user will need to verify their email." });
  };

  const removeRole = async (id: string) => {
    const { error } = await supabase.from("user_roles").delete().eq("id", id);
    if (error) toast({ title: "Error", description: error.message, variant: "destructive" });
    else fetchUsers();
  };

  if (role !== "admin") {
    return (
      <div className="space-y-6">
        <h2 className="text-2xl font-bold text-foreground">Users</h2>
        <p className="text-muted-foreground">Only admins can manage users.</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-foreground">Admin Users</h2>
        <Button onClick={() => setOpen(true)}><Plus className="h-4 w-4 mr-2" />Add User</Button>
      </div>

      <Card>
        <CardContent className="pt-6">
          {users.length === 0 ? (
            <p className="text-muted-foreground text-sm">No admin users yet.</p>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Role</TableHead>
                  <TableHead>Added</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {users.map((u) => (
                  <TableRow key={u.id}>
                    <TableCell className="font-medium">{u.display_name}</TableCell>
                    <TableCell><Badge variant="secondary" className="capitalize">{u.role}</Badge></TableCell>
                    <TableCell className="text-muted-foreground">{format(new Date(u.created_at), "MMM d, yyyy")}</TableCell>
                    <TableCell>
                      <Button variant="ghost" size="icon" onClick={() => removeRole(u.id)}>
                        <Trash2 className="h-4 w-4 text-destructive" />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent>
          <DialogHeader><DialogTitle>Add Admin User</DialogTitle></DialogHeader>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label>Display Name</Label>
              <Input value={newUser.display_name} onChange={(e) => setNewUser({ ...newUser, display_name: e.target.value })} maxLength={100} />
            </div>
            <div className="space-y-2">
              <Label>Email</Label>
              <Input type="email" value={newUser.email} onChange={(e) => setNewUser({ ...newUser, email: e.target.value })} maxLength={255} />
            </div>
            <div className="space-y-2">
              <Label>Password</Label>
              <Input type="password" value={newUser.password} onChange={(e) => setNewUser({ ...newUser, password: e.target.value })} />
            </div>
            <div className="space-y-2">
              <Label>Role</Label>
              <Select value={newUser.role} onValueChange={(v) => setNewUser({ ...newUser, role: v as "admin" | "editor" })}>
                <SelectTrigger><SelectValue /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="editor">Editor</SelectItem>
                  <SelectItem value="admin">Admin</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <Button onClick={handleCreate} className="w-full" disabled={loading}>Create User</Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
