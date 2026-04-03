"use client";

import { useAuth } from "@/components/providers/auth-provider";
import { TransactionForm } from "@/components/dashboard/transaction-form";
import { TransactionsTable } from "@/components/dashboard/transactions-table";
import { Button } from "@/components/ui/button";
import { GlassCard } from "@/components/ui/glass-card";
import { Input } from "@/components/ui/input";
import { Select } from "@/components/ui/select";
import { api } from "@/lib/api";
import { FinancialRecord } from "@/lib/types";
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useState } from "react";

export default function TransactionsPage() {
  const { user } = useAuth();
  const router = useRouter();
  const [records, setRecords] = useState<FinancialRecord[]>([]);
  const [query, setQuery] = useState({
    search: "",
    type: "",
    category: ""
  });

  const loadRecords = useCallback(async () => {
    const params = Object.fromEntries(
      Object.entries(query).filter(([, value]) => value.trim() !== "")
    );
    const response = await api.get("/records", { params });
    setRecords(response.data.data as FinancialRecord[]);
  }, [query]);

  useEffect(() => {
    if (user?.role === "VIEWER") {
      router.replace("/dashboard");
      return;
    }

    void loadRecords();
  }, [loadRecords, router, user?.role]);

  if (user?.role === "VIEWER") {
    return (
      <GlassCard>
        <h3 className="font-display text-2xl font-semibold text-foreground">Records restricted</h3>
        <p className="mt-2 text-sm text-foreground/55">
          Viewer accounts can access dashboard summaries only. Record-level finance data is available to Analyst and Admin roles.
        </p>
      </GlassCard>
    );
  }

  return (
    <div className="space-y-6">
      <GlassCard>
        <div className="grid gap-3 md:grid-cols-4">
          <Input
            placeholder="Search"
            value={query.search}
            onChange={(event) => setQuery((current) => ({ ...current, search: event.target.value }))}
          />
          <Select
            value={query.type}
            onChange={(event) => setQuery((current) => ({ ...current, type: event.target.value }))}
          >
            <option value="">All types</option>
            <option value="INCOME">Income</option>
            <option value="EXPENSE">Expense</option>
          </Select>
          <Input
            placeholder="Category"
            value={query.category}
            onChange={(event) => setQuery((current) => ({ ...current, category: event.target.value }))}
          />
          <Button onClick={() => void loadRecords()}>Apply filters</Button>
        </div>
      </GlassCard>

      {user?.role === "ADMIN" ? (
        <TransactionForm
          onSubmit={async (payload) => {
            await api.post("/records", payload);
            await loadRecords();
          }}
        />
      ) : null}

      <TransactionsTable
        items={records}
        role={user?.role ?? "VIEWER"}
        onDelete={async (id) => {
          await api.delete(`/records/${id}`);
          await loadRecords();
        }}
      />
    </div>
  );
}
