/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    screens: {
      xs: {max: '375px'},
      sm: {max: '600px'},
      md: {max: '900px'},
      lg: {max: '1200px'},
      xl: {min: '1536px'},
      smplus: {min: '600px'}
    },
    extend: {
      fontFamily: {
        'sans': ['Roboto', 'Helvetica', 'Arial', 'sans-serif']
      }
    }
  },
  plugins: [],
}
