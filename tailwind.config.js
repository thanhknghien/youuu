/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        pink: {
          200: '#FFDBEB',
          500: '#FF69B4',
          600: '#FF1493',
        },
        mint: {
          200: '#C8F8E4',
          500: '#2EE59D',
        },
      },
      fontFamily: {
        poppins: ['Poppins', 'sans-serif'],
      },
    },
  },
  plugins: [],
}