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
        // Enterprise UI Colors
        'primary': '#2563eb', // Professional Blue
        'primary-hover': '#1d4ed8',
        'accent': '#7c3aed', // AI Deep Purple
        'background': '#f8fafc', // Light Neutral Gray
        'surface': '#ffffff', // Pure White
        'success': '#16a34a',
        'warning': '#d97706',
        'danger': '#dc2626',
        'muted': '#64748b', // Slate 500
        'border': '#e2e8f0', // Slate 200
        // Legacy colors (kept for backwards compatibility until full removal)
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
