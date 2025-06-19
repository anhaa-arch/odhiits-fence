/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#1E40AF', // өөрийн өнгө
        secondary: '#F59E42',
        mygreen: '#10B981',
      },
    },
  },
  plugins: [],
}

