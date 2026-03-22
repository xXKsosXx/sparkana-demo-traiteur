import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#99420d",
        "primary-container": "#b95925",
        secondary: "#5d5c74",
        tertiary: "#765700",
        "tertiary-fixed": "#ffdf9f",
        surface: "#fdf9f3",
        "surface-container": "#f1ede7",
        "surface-container-low": "#f7f3ed",
        "surface-container-high": "#ebe8e2",
        "surface-container-highest": "#e6e2dc",
        "on-surface": "#1c1c18",
        "on-surface-variant": "#56433a",
        outline: "#897268",
        "outline-variant": "#dcc1b5",
        "dark-bg": "#1a1a2e",
      },
      fontFamily: {
        serif: ["var(--font-noto-serif)", "Georgia", "serif"],
        sans: ["var(--font-manrope)", "system-ui", "sans-serif"],
      },
      borderRadius: {
        DEFAULT: "0.125rem",
      },
    },
  },
  plugins: [],
};
export default config;
