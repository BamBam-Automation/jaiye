/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    'node_modules/preline/dist/*.js',
  ],
  theme: {
    extend: {
      colors: {
        "primary": "#8E0D3B"
      }
    },
  },
  plugins: [
    require('preline/plugin'),
  ],
}