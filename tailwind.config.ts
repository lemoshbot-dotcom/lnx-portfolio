import type { Config } from "tailwindcss";

export default {
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

        // LNX Official Color Palette - Monochrome Elegance
        lnx: {
          // BLACKS - Base & Backgrounds
          'pure-black': '#000000',
          'rich-black': '#0a0a0a',
          'deep-black': '#141414',

          // GRAYS - Intermediate Elements
          'charcoal': '#1a1a1a',
          'slate': '#262626',
          'steel': '#404040',
          'silver': '#737373',
          'light-silver': '#a3a3a3',
          'platinum': '#d4d4d4',

          // WHITES - Text & Highlights
          'snow': '#f5f5f5',
          'pure-white': '#ffffff',
        },
      },
      fontFamily: {
        sans: ["var(--font-inter)", "sans-serif"],
      },
    },
  },
  plugins: [],
} satisfies Config;
