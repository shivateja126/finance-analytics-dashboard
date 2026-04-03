import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: ["class"],
  content: [
    "./src/pages/**/*.{ts,tsx}",
    "./src/components/**/*.{ts,tsx}",
    "./src/app/**/*.{ts,tsx}"
  ],
  theme: {
    extend: {
      fontFamily: {
        display: ["var(--font-space-grotesk)"],
        body: ["var(--font-plus-jakarta)"]
      },
      colors: {
        surface: "rgb(var(--surface) / <alpha-value>)",
        panel: "rgb(var(--panel) / <alpha-value>)",
        line: "rgb(var(--line) / <alpha-value>)",
        accent: "rgb(var(--accent) / <alpha-value>)",
        success: "rgb(var(--success) / <alpha-value>)",
        danger: "rgb(var(--danger) / <alpha-value>)"
      },
      boxShadow: {
        glow: "0 12px 60px rgba(10, 132, 255, 0.18)",
        glass: "0 20px 60px rgba(15, 23, 42, 0.18)"
      },
      backgroundImage: {
        mesh: "radial-gradient(circle at 20% 20%, rgba(93, 135, 255, 0.22), transparent 35%), radial-gradient(circle at 80% 0%, rgba(57, 209, 201, 0.18), transparent 30%), radial-gradient(circle at 50% 100%, rgba(255, 140, 92, 0.16), transparent 40%)"
      }
    }
  },
  plugins: []
};

export default config;
