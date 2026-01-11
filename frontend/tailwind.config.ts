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
        titan: {
          dark: "#050505",    // Deepest Black (Main BG)
          panel: "#101010",   // Secondary BG (Cards)
          orange: "#FF4D00",  // High-Vis Safety Orange
          steel: "#1F2937",   // Dark Blue-Grey (Borders)
          concrete: "#9CA3AF",// Text Grey
          white: "#EDEDED",   // Off-white text (easier on eyes)
        },
      },
      fontFamily: {
        // We define these names here, but load them in layout.tsx
        sans: ["var(--font-oswald)", "sans-serif"], 
        mono: ["var(--font-roboto-mono)", "monospace"],
      },
      backgroundImage: {
        'grid-pattern': "linear-gradient(to right, #1f2937 1px, transparent 1px), linear-gradient(to bottom, #1f2937 1px, transparent 1px)",
      }
    },
  },
  plugins: [],
};
export default config;