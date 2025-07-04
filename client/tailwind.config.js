/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: '#2563EB',
        'primary-dull': '#1F58d8',
        light: '#F1F5F9',
        borderColor: '#c4c7d2',
      },
    },
  },
  plugins: [],
}
