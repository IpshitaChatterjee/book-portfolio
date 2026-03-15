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
        forest: "#1C2B1E",
        eucalyptus: "#24746B",
        gumbo: "#7BA3A3",
        parchment: "#F0E8D0",
        offwhite: "#FAF8F0",
        ink: "#1A1A14",
        warmgrey: "#6B6B58",
        feijoa: "#A2C97C",
        ochre: "#C9933A",
      },
      fontFamily: {
        sans: ["var(--font-geist-sans)", "sans-serif"],
        mono: ["var(--font-geist-mono)", "monospace"],
      },
    },
  },
  plugins: [],
};
export default config;
