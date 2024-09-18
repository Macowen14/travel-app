/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./App.{js,jsx,ts,tsx}",
    "./screens/**/*.{js,jsx,ts,tsx}",
    "./components/**/*.{js,jsx,ts,tsx}",
    "./app/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        outfitBold: ["outfitBold", "san-serif"],
        outfitLight: ["outfitLight", "san-serif"],
        outfitRegular: ["outfitRegular", "san-serif"],
        outfitMedium: ["outfitMedium", "san-serif"],
        outfitThin: ["outfitThin", "san-serif"],
      },
      colors: {
        tintLight: "#0a7ea4",
        text: "#ECEDEE",
        background: "#151718",
        iconDark: "#9BA1A6",
        iconLight: "#687076",
      },
    },
  },
  plugins: [],
};
