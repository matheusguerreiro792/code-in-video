import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        "g-blue": "#4285F4",
        "g-red": "#EA4335",
        "g-yellow": "#FBBC05",
        "g-green": "#34A853",
      },
      fontFamily: {
        ubuntuMono: "Ubuntu Mono, monospace",
      },
      height: {
        home: "calc(100vh - 92px)",
      }
    },
  },
  plugins: [],
};
export default config;
