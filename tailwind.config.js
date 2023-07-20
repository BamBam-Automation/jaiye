/** @type {import('tailwindcss').Config} */
const withMT = require("@material-tailwind/react/utils/withMT");

module.exports = withMT({
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        "primary": "#8E0D3B",
        "secondary": "#FDCC4A",
        "tertiary": "#242424"
      },
    },
  },
  plugins: [],
})