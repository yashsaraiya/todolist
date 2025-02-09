/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        inter: ['Inter', 'sans-serif'],
        pacifico: ['Pacifico', 'cursive'],
        sedan: ['Sedan', 'serif'],
        tourney: ['Tourney', 'sans-serif'],
        rubikVinyl: ['Rubik Vinyl', 'cursive'],
      },
    },
  },  
  plugins: [],
}

