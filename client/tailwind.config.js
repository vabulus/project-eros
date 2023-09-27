/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./server/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [
    require('@tailwindcss/forms'),
  ],
}
