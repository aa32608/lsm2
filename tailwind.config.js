export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
  // Exclude globals.css from Tailwind processing if it's causing issues
  corePlugins: {
    preflight: false, // Disable Tailwind's base styles since we have custom CSS
  },
}
