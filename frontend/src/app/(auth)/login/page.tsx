"use client";

import { Button } from "@/components/ui/button";
import { GlassCard } from "@/components/ui/glass-card";
import { Input } from "@/components/ui/input";
import { AmbientScene } from "@/components/three/ambient-scene";
import { useAuth } from "@/components/providers/auth-provider";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { ArrowUpRight, LockKeyhole, ShieldCheck, Sparkles, TrendingUp } from "lucide-react";
import { useState } from "react";

const quickAccounts = [
  { label: "Admin", email: "admin@finance.local", password: "Password123!" },
  { label: "Analyst", email: "analyst@finance.local", password: "Password123!" },
  { label: "Viewer", email: "viewer@finance.local", password: "Password123!" }
] as const;

const heroChips = [
  "Role-aware access",
  "Protected records",
  "Live finance summaries"
];

export default function LoginPage() {
  const { login, loading } = useAuth();
  const [email, setEmail] = useState("admin@finance.local");
  const [password, setPassword] = useState("Password123!");
  const [error, setError] = useState<string | null>(null);

  return (
    <div className="relative min-h-screen overflow-y-auto">
      <AmbientScene />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(57,209,201,0.12),transparent_24%),radial-gradient(circle_at_bottom_left,rgba(93,135,255,0.16),transparent_30%)]" />
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,transparent_74%,rgba(4,10,24,0.42)_100%)]" />
      <div className="noise-overlay pointer-events-none absolute inset-0 opacity-[0.04]" />

      <div className="relative flex min-h-screen items-center justify-center px-4 py-4 md:px-6">
        <div className="grid w-full max-w-7xl grid-cols-1 gap-10 lg:grid-cols-2 lg:items-stretch">
          <motion.section
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            className="hidden rounded-[36px] border border-white/10 bg-[linear-gradient(180deg,rgba(8,16,40,0.58),rgba(8,16,40,0.28))] p-10 shadow-glass backdrop-blur-[18px] lg:flex lg:flex-col xl:p-12"
          >
            <div className="flex h-full flex-col justify-between">
              <div className="flex flex-col gap-8">
                <div className="flex items-center justify-between gap-6">
                  <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.045] px-4 py-2 text-sm text-foreground/70">
                    <Sparkles size={14} className="text-accent" />
                    FlowControl Finance Platform
                  </div>
                  <div className="text-[11px] uppercase tracking-[0.28em] text-foreground/38">
                    Finance Operations
                  </div>
                </div>

                <div className="flex flex-col gap-6">
                  <div className="text-xs uppercase tracking-[0.32em] text-foreground/40">
                    Access intelligence
                  </div>
                  <h1 className="max-w-[520px] font-display text-[54px] font-semibold leading-[1.1] tracking-[-0.05em] text-foreground/94 xl:text-[62px]">
                    Intelligent access for modern finance systems.
                  </h1>
                  <p className="max-w-[480px] text-[17px] leading-relaxed text-foreground/60">
                    Secure records, readable analytics, and sharp role boundaries in one calm, high-trust control layer.
                  </p>
                </div>

                <div className="flex flex-wrap gap-3">
                  {heroChips.map((chip) => (
                    <motion.div
                      key={chip}
                      whileHover={{ y: -2 }}
                      transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
                      className="rounded-full border border-white/10 bg-white/[0.05] px-4 py-2.5 text-sm text-foreground/68 transition duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] hover:border-white/16 hover:bg-white/[0.07]"
                    >
                      {chip}
                    </motion.div>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-2 gap-6">
                <motion.div
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.08, duration: 0.4 }}
                  className="flex h-full min-w-0 flex-col overflow-hidden rounded-[28px] border border-white/10 bg-[linear-gradient(180deg,rgba(255,255,255,0.06),rgba(255,255,255,0.025))] p-5"
                >
                  <div className="flex items-center justify-between gap-4">
                    <div>
                      <div className="text-[11px] uppercase tracking-[0.28em] text-foreground/38">
                        Insight stream
                      </div>
                      <div className="mt-2 text-lg font-semibold text-foreground/88">
                        Live finance signal
                      </div>
                    </div>
                    <div className="rounded-full border border-white/10 bg-white/[0.045] px-3 py-1 text-[11px] uppercase tracking-[0.22em] text-foreground/42">
                      Active
                    </div>
                  </div>

                  <div className="relative mt-5 flex-1 overflow-hidden rounded-[22px] border border-white/8 bg-slate-950/16">
                    <div className="absolute inset-0 opacity-[0.1] [background-image:linear-gradient(rgba(255,255,255,0.9)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.9)_1px,transparent_1px)] [background-size:28px_28px]" />
                    <svg
                      viewBox="0 0 480 180"
                      className="absolute inset-0 h-full w-full"
                      fill="none"
                      preserveAspectRatio="none"
                    >
                      <defs>
                        <linearGradient id="login-wave" x1="0" y1="0" x2="1" y2="0">
                          <stop offset="0%" stopColor="rgba(93,135,255,0.18)" />
                          <stop offset="48%" stopColor="rgba(125,174,255,0.74)" />
                          <stop offset="100%" stopColor="rgba(57,209,201,0.58)" />
                        </linearGradient>
                        <linearGradient id="login-fill" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="0%" stopColor="rgba(93,135,255,0.22)" />
                          <stop offset="100%" stopColor="rgba(93,135,255,0.02)" />
                        </linearGradient>
                      </defs>
                      <path
                        d="M0 122 C34 118, 72 80, 116 90 C152 98, 184 148, 232 134 C278 120, 300 64, 348 68 C394 72, 424 116, 480 82"
                        stroke="url(#login-wave)"
                        strokeWidth="4"
                        strokeLinecap="round"
                      />
                      <path
                        d="M0 122 C34 118, 72 80, 116 90 C152 98, 184 148, 232 134 C278 120, 300 64, 348 68 C394 72, 424 116, 480 82 L480 180 L0 180 Z"
                        fill="url(#login-fill)"
                      />
                    </svg>

                    <motion.div
                      animate={{ x: [0, 8, 0], y: [0, -3, 0] }}
                      transition={{ duration: 7, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
                      className="absolute right-4 top-4 rounded-[18px] border border-white/10 bg-white/[0.085] px-4 py-3 backdrop-blur-md"
                    >
                      <div className="text-[11px] uppercase tracking-[0.24em] text-foreground/40">
                        Net balance
                      </div>
                      <div className="mt-2 flex items-center gap-2 text-2xl font-semibold text-foreground/90">
                        <ArrowUpRight size={17} className="text-teal-300" />
                        ₹39.5L
                      </div>
                    </motion.div>
                  </div>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.14, duration: 0.4 }}
                  className="grid h-full min-w-0 grid-rows-2 gap-6"
                >
                  <div className="overflow-hidden rounded-[28px] border border-white/10 bg-white/[0.045] p-5">
                    <div className="flex items-center gap-3">
                      <div className="flex h-10 w-10 items-center justify-center rounded-2xl border border-white/10 bg-white/[0.05] text-accent">
                        <ShieldCheck size={17} />
                      </div>
                      <div>
                        <div className="text-[11px] uppercase tracking-[0.28em] text-foreground/38">
                          Access intelligence
                        </div>
                        <div className="mt-1 text-lg font-semibold text-foreground/88">
                          Role boundaries stay sharp.
                        </div>
                      </div>
                    </div>
                    <p className="mt-4 text-sm leading-7 text-foreground/56">
                      Admin, Analyst, and Viewer workflows remain distinct without adding interface friction.
                    </p>
                  </div>

                  <div className="overflow-hidden rounded-[28px] border border-white/10 bg-white/[0.045] p-5">
                    <div className="text-[11px] uppercase tracking-[0.28em] text-foreground/38">
                      System coverage
                    </div>
                    <div className="mt-4 flex items-end justify-between gap-4">
                      <div className="min-w-0">
                        <div className="text-4xl font-semibold text-foreground/92">14</div>
                        <div className="mt-2 text-sm text-foreground/48">
                          Protected routes in active use
                        </div>
                      </div>
                      <div className="flex flex-wrap justify-end gap-2 text-[11px] text-foreground/56">
                        <span className="rounded-full border border-white/10 px-3 py-1">Admin</span>
                        <span className="rounded-full border border-white/10 px-3 py-1">Analyst</span>
                        <span className="rounded-full border border-white/10 px-3 py-1">Viewer</span>
                      </div>
                    </div>
                  </div>
                </motion.div>
              </div>
            </div>
          </motion.section>

          <motion.section
            initial={{ opacity: 0, scale: 0.98, y: 18 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
            className="flex h-full items-center justify-center"
          >
            <div className="relative flex h-full w-full items-center justify-center">
              <GlassCard className="noise-overlay relative w-full max-w-[560px] overflow-hidden rounded-2xl border border-white/10 bg-white/5 p-8 shadow-[0_24px_80px_rgba(0,0,0,0.34)] backdrop-blur-xl md:p-10">
                <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,rgba(255,255,255,0.06),transparent_26%,rgba(255,255,255,0.02))]" />
                <div className="pointer-events-none absolute inset-x-0 top-0 h-20 bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.12),transparent_70%)]" />
                <div className="pointer-events-none absolute right-[-3rem] top-[-2rem] h-44 w-44 rounded-full bg-[radial-gradient(circle_at_center,rgba(57,209,201,0.18),transparent_70%)] blur-2xl" />

                <div className="relative">
                  <div className="flex items-start gap-4">
                    <div className="flex h-14 w-14 items-center justify-center rounded-[20px] border border-white/10 bg-white/[0.07] text-accent shadow-[inset_0_1px_0_rgba(255,255,255,0.08)]">
                      <LockKeyhole size={22} />
                    </div>
                    <div>
                      <div className="text-xs uppercase tracking-[0.34em] text-foreground/40">
                        Authentication
                      </div>
                      <h2 className="mt-2 font-display text-[46px] font-semibold leading-none text-foreground/95">
                        Sign in
                      </h2>
                      <p className="mt-3 max-w-[360px] text-sm leading-7 text-foreground/58">
                        Access the finance workspace through a role-aware environment designed for speed and control.
                      </p>
                    </div>
                  </div>

                  <div className="mt-8">
                    <div className="mb-3 text-[11px] uppercase tracking-[0.28em] text-foreground/38">
                      Access
                    </div>
                    <div className="grid gap-2">
                      {quickAccounts.map((account) => (
                        <motion.button
                          key={account.label}
                          type="button"
                          whileHover={{ y: -2 }}
                          transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
                          onClick={() => {
                            setEmail(account.email);
                            setPassword(account.password);
                            setError(null);
                          }}
                          className={cn(
                            "group flex items-center justify-between rounded-[20px] border border-white/10 bg-white/[0.045] px-4 py-3 text-left transition duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] hover:border-white/16 hover:bg-white/[0.075]",
                            email === account.email && "border-accent/30 bg-white/[0.08]"
                          )}
                        >
                          <div className="min-w-0">
                            <div className="text-sm font-medium text-foreground/84">
                              {account.label}
                            </div>
                            <div className="mt-1 text-xs uppercase tracking-[0.18em] text-foreground/40">
                              {account.label === "Admin"
                                ? "Full control"
                                : account.label === "Analyst"
                                  ? "Records + analytics"
                                  : "Dashboard access"}
                            </div>
                          </div>
                          <div className="rounded-full border border-white/10 px-3 py-1 text-[11px] uppercase tracking-[0.22em] text-foreground/46 transition group-hover:text-foreground/65">
                            Use
                          </div>
                        </motion.button>
                      ))}
                    </div>
                  </div>

                  <form
                    className="mt-8 space-y-4"
                    onSubmit={async (event) => {
                      event.preventDefault();
                      setError(null);
                      try {
                        await login(email, password);
                      } catch {
                        setError("Login failed. Check your credentials and try again.");
                      }
                    }}
                  >
                    <div className="space-y-2">
                      <label className="text-[11px] uppercase tracking-[0.28em] text-foreground/38">
                        Workspace email
                      </label>
                      <Input
                        type="email"
                        placeholder="Email"
                        value={email}
                        onChange={(event) => setEmail(event.target.value)}
                        className="bg-slate-950/18 shadow-[inset_0_1px_0_rgba(255,255,255,0.05)]"
                      />
                    </div>

                    <div className="space-y-2">
                      <label className="text-[11px] uppercase tracking-[0.28em] text-foreground/38">
                        Password
                      </label>
                      <Input
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(event) => setPassword(event.target.value)}
                        className="bg-slate-950/18 shadow-[inset_0_1px_0_rgba(255,255,255,0.05)]"
                      />
                    </div>

                    {error ? <p className="text-sm text-rose-400">{error}</p> : null}

                    <Button
                      type="submit"
                      className="w-full bg-[linear-gradient(135deg,rgba(93,135,255,1),rgba(108,150,255,0.96),rgba(84,191,214,0.92))] py-3.5 text-base shadow-[0_18px_40px_rgba(93,135,255,0.28)] hover:shadow-[0_22px_48px_rgba(93,135,255,0.38)]"
                      disabled={loading}
                    >
                      {loading ? "Signing in..." : "Access workspace"}
                    </Button>
                  </form>

                  <div className="mt-8 rounded-[22px] border border-white/10 bg-white/[0.04] px-4 py-4">
                    <div className="text-[11px] uppercase tracking-[0.28em] text-foreground/38">
                      Demo path
                    </div>
                    <div className="mt-3 flex flex-wrap gap-2">
                      {quickAccounts.map((account) => (
                        <span
                          key={account.email}
                          className="rounded-full border border-white/10 px-3 py-1.5 text-xs text-foreground/58"
                        >
                          {account.label}
                        </span>
                      ))}
                    </div>
                    <p className="mt-3 text-sm leading-6 text-foreground/48">
                      Default password for seeded accounts:{" "}
                      <span className="font-medium text-foreground/74">Password123!</span>
                    </p>
                  </div>
                </div>
              </GlassCard>
            </div>
          </motion.section>
        </div>
      </div>
    </div>
  );
}
