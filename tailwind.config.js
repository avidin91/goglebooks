/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js,jsx}"],
  theme: {
    extend: {
      height: {
        '128': '31rem',
      },
      width: {
        '1/3-books': '29%',
      }
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
  ],
}