import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}", "ui"],
  darkMode: ["class"],
  theme: {
    extend: {
      colors: {
        primary: "#005CB0",
      },
    },
  },
  plugins: [],
};
export default config;
