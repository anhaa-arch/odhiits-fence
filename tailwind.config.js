/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#22d3ee', // cyan-400
        secondary: '#fbbf24', // amber-400
        accent: '#a3e635', // lime-400
        brandDark: '#020617', // slate-950
      },
    },
  },
  plugins: [],
}

