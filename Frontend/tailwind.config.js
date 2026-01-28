/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
         primary: '#0F4C81',        // Classic Blue
         secondary: '#FFA500',      // Vibrant Orange
         accent: '#00A896',         // Teal
         dark: '#2D3748',
         light: '#F7FAFC'
      },
      fontFamily: {
         sans: ['Inter', 'sans-serif'],
      }
    },
  },
  plugins: [],
}
