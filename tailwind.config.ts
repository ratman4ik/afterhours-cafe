import type { Config } from "tailwindcss";

export default {
  content: ["./app/**/*.{js,ts,jsx,tsx,mdx}", "./components/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        ink: "#11110F",
        cream: "#E9E2D0",
        rust: "#C95E32",
        coal: "#1B1B18",
      },
    },
  },
  plugins: [],
} satisfies Config;
