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
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from "@/components/ui/alert-dialog";
import { useToast } from "@/hooks/use-toast";
import { useAdminAuth } from "@/hooks/useAdminAuth";
import { Plus, Trash2, Search } from "lucide-react";
import { format } from "date-fns";

interface UserRow {
  user_id: string;
  email: string;
  display_name: string | null;
  country: string | null;
  city: string | null;
  county: string | null;
  town: string | null;
  membership_type: string | null;
  onboarded: boolean;
  created_at: string;
  role: string | null;
}

export default function AdminUsers() {
  const [users, setUsers] = useState<UserRow[]>([]);
  const [search, setSearch] = useState("");
  const [open, setOpen] = useState(false);
  const [newUser, setNewUser] = useState({ email: "", password: "", role: "editor" as "admin" | "editor", display_name: "" });
  const [loading, setLoading] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [userToDelete, setUserToDelete] = useState<{ user_id: string; display_name: string | null } | null>(null);
  const { toast } = useToast();
  const { role, user: currentUser } = useAdminAuth();

  const fetchUsers = async () => {
    const { data, error } = await supabase.rpc("get_all_users_for_admin" as any);
    if (error) {
      console.error("Error fetching users:", error);
      toast({ title: "Error", description: error.message, variant: "destructive" });
      return;
    }
    setUsers((data as unknown as UserRow[]) || []);
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

  const removeRole = async (userId: string) => {
    if (userId === currentUser?.id) {
      toast({ title: "Not allowed", description: "You cannot remove your own role.", variant: "destructive" });
      return;
    }
    const { error } = await supabase.from("user_roles").delete().eq("user_id", userId);
    if (error) toast({ title: "Error", description: error.message, variant: "destructive" });
    else fetchUsers();
  };

  const requestDeleteUser = (userId: string, displayName: string | null) => {
    if (userId === currentUser?.id) {
      toast({ title: "Not allowed", description: "You cannot delete yourself.", variant: "destructive" });
      return;
    }
    setUserToDelete({ user_id: userId, display_name: displayName });
  };

  const confirmDeleteUser = async () => {
    if (!userToDelete) return;

    setIsDeleting(true);
    const { error } = await supabase.functions.invoke("delete-user", {
      body: { user_id: userToDelete.user_id },
    });

    if (error) {
      toast({ title: "Error", description: error.message, variant: "destructive" });
    } else {
      toast({ title: "User deleted", description: `${userToDelete.display_name || "User"} has been removed.` });
      fetchUsers();
    }

    setIsDeleting(false);
    setUserToDelete(null);
  };

  const filteredUsers = users.filter((u) => {
    const q = search.toLowerCase();
    return (
      (u.display_name || "").toLowerCase().includes(q) ||
      (u.email || "").toLowerCase().includes(q) ||
      (u.country || "").toLowerCase().includes(q) ||
      (u.city || "").toLowerCase().includes(q)
    );
  });

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
        <h2 className="text-2xl font-bold text-foreground">All Members</h2>
        <Button onClick={() => setOpen(true)}><Plus className="h-4 w-4 mr-2" />Add User</Button>
      </div>

      <div className="relative max-w-sm">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Search by name, email, country..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="pl-9"
        />
      </div>

      <Card>
        <CardContent className="pt-6">
          {filteredUsers.length === 0 ? (
            <p className="text-muted-foreground text-sm">No users found.</p>
          ) : (
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead>Email</TableHead>
                    <TableHead>Country</TableHead>
                    <TableHead>City</TableHead>
                    <TableHead>Role</TableHead>
                    <TableHead>Joined</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredUsers.map((u) => (
                    <TableRow key={u.user_id}>
                      <TableCell className="font-medium">{u.display_name || " "}</TableCell>
                      <TableCell className="text-muted-foreground">{u.email}</TableCell>
                      <TableCell>{u.country || " "}</TableCell>
                      <TableCell>{u.city || " "}</TableCell>
                      <TableCell>
                        {u.role ? (
                          <Badge variant="secondary" className="capitalize">{u.role}</Badge>
                        ) : (
                          <span className="text-muted-foreground text-sm">member</span>
                        )}
                      </TableCell>
                      <TableCell className="text-muted-foreground">
                        {format(new Date(u.created_at), "MMM d, yyyy")}
                      </TableCell>
                      <TableCell>
                        {u.user_id !== currentUser?.id && (
                          <div className="flex items-center gap-1">
                            {u.role && (
                              <Button variant="ghost" size="icon" onClick={() => removeRole(u.user_id)} title="Remove admin/editor role">
                                <Trash2 className="h-4 w-4 text-muted-foreground" />
                              </Button>
                            )}
                            <Button variant="ghost" size="icon" onClick={() => requestDeleteUser(u.user_id, u.display_name)} title="Delete user permanently">
                              <Trash2 className="h-4 w-4 text-destructive" />
                            </Button>
                          </div>
                        )}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          )}
          <p className="text-xs text-muted-foreground mt-4">{filteredUsers.length} user{filteredUsers.length !== 1 ? "s" : ""} total</p>
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

      <AlertDialog open={!!userToDelete} onOpenChange={(open) => { if (!open) setUserToDelete(null); }}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete user permanently?</AlertDialogTitle>
            <AlertDialogDescription>
              This will permanently remove {userToDelete?.display_name || "this user"} and cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel disabled={isDeleting}>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={confirmDeleteUser} disabled={isDeleting}>
              {isDeleting ? "Deleting..." : "Delete user"}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
