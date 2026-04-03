"use client";

import { useEffect, useState } from "react";
import { api } from "@/lib/api";
import { DashboardSummary } from "@/lib/types";
import { StatCard } from "@/components/dashboard/stat-card";
import { OverviewChart } from "@/components/charts/overview-chart";
import { RecentTransactions } from "@/components/dashboard/recent-transactions";

export default function DashboardPage() {
  const [summary, setSummary] = useState<DashboardSummary | null>(null);

  useEffect(() => {
    void api.get("/dashboard/summary").then((response) => {
      setSummary(response.data.data as DashboardSummary);
    });
  }, []);

  if (!summary) {
    return <div className="text-foreground/60">Loading dashboard...</div>;
  }

  return (
    <div className="space-y-6">
      <section className="grid gap-6 md:grid-cols-3">
        <StatCard
          title="Total income"
          value={summary.totals.income}
          tone="income"
          subtitle="All recorded incoming cashflow"
        />
        <StatCard
          title="Total expenses"
          value={summary.totals.expenses}
          tone="expense"
          subtitle="Operational and strategic outflows"
        />
        <StatCard
          title="Net balance"
          value={summary.totals.netBalance}
          tone="balance"
          subtitle="Live difference between income and spend"
        />
      </section>

      <OverviewChart summary={summary} />
      <RecentTransactions items={summary.recentTransactions} />
    </div>
  );
}
