import { ReactNode } from "react";
import { ProtectedShell } from "@/components/auth/protected-shell";

export default function DashboardLayout({
  children
}: {
  children: ReactNode;
}) {
  return <ProtectedShell>{children}</ProtectedShell>;
}
