/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}"],
  theme: {
    extend: {
      colors: {
        whitepink: "#fff0f5",
        primary: "#ea65b8",
        secondary: "#9d2b9d",
      },
      fontFamily: {
        heading: ["Playfair Display", "sans-serif"]
      }
    },
  },
  plugins: [],
};
