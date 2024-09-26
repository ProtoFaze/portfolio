/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        "primary" :"#000930",
        "secondary" :"#f44336",
        "tertiary" : "#00bcd4",
        "light": "#e3edf8",
        "dark": "#252525",
      }
    },
    screens: {
      sm:{max: '800px'},

      lg:{max: '2048px'},
    },
  },
  plugins: [],
}

