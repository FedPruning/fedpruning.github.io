/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/**/*.{js,ts,jsx,tsx,mdx}", "./components/**/*.{js,ts,jsx,tsx,mdx}", "*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#C0165F',
          dark: '#9A1150',
          light: '#FFE5F0',
        },
      },
    },
  },
  plugins: [require('@tailwindcss/typography')],
}
