"use client";

import { ButtonHTMLAttributes } from "react";
import { cn } from "@/lib/utils";

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "primary" | "secondary" | "ghost";
};

export function Button({
  className,
  variant = "primary",
  ...props
}: ButtonProps) {
  return (
    <button
      className={cn(
        "inline-flex items-center justify-center rounded-[18px] px-4 py-2 text-sm font-semibold transition duration-200 ease-out focus-visible:outline-none focus-visible:shadow-[0_0_0_3px_rgba(93,135,255,0.16)]",
        variant === "primary" &&
          "bg-accent text-white shadow-glow hover:scale-[1.01] hover:bg-accent/92 active:scale-[0.995]",
        variant === "secondary" &&
          "border border-white/10 bg-white/[0.06] text-foreground/82 backdrop-blur-xl hover:border-white/14 hover:bg-white/[0.09] dark:bg-white/[0.04]",
        variant === "ghost" && "text-foreground/70 hover:text-foreground",
        className
      )}
      {...props}
    />
  );
}
