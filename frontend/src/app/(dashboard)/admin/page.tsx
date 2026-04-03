"use client";

import { AdminPanel } from "@/components/dashboard/admin-panel";
import { useAuth } from "@/components/providers/auth-provider";
import { GlassCard } from "@/components/ui/glass-card";
import { api } from "@/lib/api";
import { User } from "@/lib/types";
import { useEffect, useState } from "react";

export default function AdminPage() {
  const { user } = useAuth();
  const [users, setUsers] = useState<User[]>([]);

  const loadUsers = async () => {
    const response = await api.get("/users");
    setUsers(response.data.data as User[]);
  };

  useEffect(() => {
    if (user?.role !== "ADMIN") return;
    void loadUsers();
  }, [user?.role]);

  if (user?.role !== "ADMIN") {
    return (
      <GlassCard>
        <h3 className="font-display text-2xl font-semibold text-foreground">Admin only</h3>
        <p className="mt-2 text-sm text-foreground/55">
          User lifecycle management is reserved for platform administrators.
        </p>
      </GlassCard>
    );
  }

  return (
    <AdminPanel
      users={users}
      currentUserId={user.id}
      onCreateUser={async (payload) => {
        await api.post("/users", payload);
        await loadUsers();
      }}
      onUpdateUser={async (id, payload) => {
        if (payload.status) {
          await api.patch(`/users/${id}/status`, { status: payload.status });
        }

        const updatePayload: Partial<User> = {};
        if (payload.role) updatePayload.role = payload.role;
        if (payload.name) updatePayload.name = payload.name;
        if (payload.email) updatePayload.email = payload.email;

        if (Object.keys(updatePayload).length > 0) {
          await api.patch(`/users/${id}`, updatePayload);
        }

        await loadUsers();
      }}
      onDeleteUser={async (id) => {
        await api.delete(`/users/${id}`);
        await loadUsers();
      }}
    />
  );
}
