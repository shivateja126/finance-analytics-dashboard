"use client";

import { OverviewChart } from "@/components/charts/overview-chart";
import { useAuth } from "@/components/providers/auth-provider";
import { GlassCard } from "@/components/ui/glass-card";
import { api } from "@/lib/api";
import { DashboardSummary } from "@/lib/types";
import { formatCurrency } from "@/lib/utils";
import { useEffect, useState } from "react";

export default function AnalyticsPage() {
  const { user } = useAuth();
  const [summary, setSummary] = useState<DashboardSummary | null>(null);

  useEffect(() => {
    if (user?.role === "VIEWER") return;
    void api.get("/dashboard/summary").then((response) => {
      setSummary(response.data.data as DashboardSummary);
    });
  }, [user?.role]);

  if (user?.role === "VIEWER") {
    return (
      <GlassCard>
        <h3 className="font-display text-2xl font-semibold text-foreground">Analytics restricted</h3>
        <p className="mt-2 text-sm text-foreground/55">
          Viewer accounts can access the dashboard and records, but deeper analytics are reserved for Analyst and Admin roles.
        </p>
      </GlassCard>
    );
  }

  if (!summary) return <div className="text-foreground/60">Loading analytics...</div>;

  const weeklyNet = summary.weeklyTrends.reduce((acc, item) => {
    return acc + (item.type === "INCOME" ? item.total : -item.total);
  }, 0);

  return (
    <div className="space-y-6">
      <div className="grid gap-6 md:grid-cols-3">
        <GlassCard>
          <div className="text-sm uppercase tracking-[0.22em] text-foreground/40">Weekly net</div>
          <div className="mt-4 font-display text-4xl font-semibold text-foreground">
            {formatCurrency(weeklyNet)}
          </div>
        </GlassCard>
        <GlassCard>
          <div className="text-sm uppercase tracking-[0.22em] text-foreground/40">Revenue categories</div>
          <div className="mt-4 font-display text-4xl font-semibold text-foreground">
            {summary.categoryBreakdown.filter((item) => item.type === "INCOME").length}
          </div>
        </GlassCard>
        <GlassCard>
          <div className="text-sm uppercase tracking-[0.22em] text-foreground/40">Expense categories</div>
          <div className="mt-4 font-display text-4xl font-semibold text-foreground">
            {summary.categoryBreakdown.filter((item) => item.type === "EXPENSE").length}
          </div>
        </GlassCard>
      </div>

      <OverviewChart summary={summary} />
    </div>
  );
}
