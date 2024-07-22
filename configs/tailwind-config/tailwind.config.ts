import type { Config } from "tailwindcss";

const config: Config = {
    content: ["./src/**/*.{js,ts,jsx,tsx,mdx}", "ui"],
    theme: {
        colors: {
            primary: "#FFD600",
            abc: "#FFD600",
            secondary: "#ecc94b",
        },
        extend: {
            colors: {
                primary: "#FFD600",
            },
        },
    },
    plugins: [],
};
export default config;
