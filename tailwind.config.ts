import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./experiences/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        ceremonial: {
          blush: {
            50: "#fdf8f6",
            100: "#f9f0ec",
            200: "#eed9d5",
            300: "#dfbcb5",
            800: "#5c4033",
          },
          crimson: {
            500: "#9e1b32",
            700: "#800020",
            900: "#4a050d",
          },
          emerald: {
            600: "#22633d",
            800: "#1a4d2e",
            950: "#0b2615",
          },
          haldi: {
            100: "#fff6d9",
            400: "#ffc000",
            500: "#e59e00",
            700: "#b37400",
          },
          gold: {
            light: "#f9f0d0",
            base: "#d4af37",
            dark: "#aa771c",
          },
          parchment: {
            light: "#fffdfa",
            base: "#f7f3ea",
            dark: "#ede6d8",
          },
          ink: "#2c2623",
          muted: "#7c7267",
        },
      },
      fontFamily: {
        serif: ["var(--font-playfair)", "serif"],
        display: ["var(--font-cinzel)", "serif"],
        bengali: ["var(--font-bengali)", "sans-serif"],
        sans: ["system-ui", "-apple-system", "sans-serif"],
      },
      boxShadow: {
        "soft-surface": "0 4px 20px -2px rgba(44, 30, 15, 0.08)",
        "elevated-card": "0 12px 36px -4px rgba(35, 20, 10, 0.16), 0 4px 12px rgba(0, 0, 0, 0.06)",
        "floating-ceremony": "0 24px 64px -8px rgba(28, 15, 5, 0.28), 0 8px 24px rgba(0, 0, 0, 0.08)",
        "wax-seal": "0 4px 12px rgba(139, 0, 0, 0.4), inset 0 2px 4px rgba(255, 255, 255, 0.2)",
        "inner-emboss": "inset 0 2px 4px rgba(0, 0, 0, 0.08), inset 0 -2px 4px rgba(255, 255, 255, 0.6)",
      },
      keyframes: {
        shimmer: {
          "0%": { backgroundPosition: "-200% 0" },
          "100%": { backgroundPosition: "200% 0" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-6px)" },
        },
        pulseGlow: {
          "0%, 100%": { opacity: "0.6", transform: "scale(1)" },
          "50%": { opacity: "0.9", transform: "scale(1.05)" },
        },
      },
      animation: {
        shimmer: "shimmer 3s infinite linear",
        float: "float 4s ease-in-out infinite",
        pulseGlow: "pulseGlow 2.5s ease-in-out infinite",
      },
    },
  },
  plugins: [],
};
export default config;
