/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        'sans': ['Inter', 'Roboto', 'Poppins', 'system-ui', 'sans-serif'],
      },
      colors: {
        'gov-fill': '#e8f5e8',
        'priv-fill': '#f0f8ff',
        'plot-boundary': '#4a5568',
        'road': '#6b7280',
        'park-fill': '#f0fdf4',
      }
    },
  },
  plugins: [],
}

