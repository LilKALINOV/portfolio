/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#0a0a1a",
        secondary: "#1a1a2e",
        accent: "#00f0ff",
        accent2: "#ff00ff",
        text: "#e0e0e0",
        textDim: "#808090",
        border: "#2a2a3a",
      },
      fontFamily: {
        mono: ["Courier New", "monospace"],
        display: ["'Courier New', monospace"],
      },
    },
  },
  plugins: [],
};