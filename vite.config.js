import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          'firebase': ['firebase/app', 'firebase/auth', 'firebase/database'],
          'paypal': ['@paypal/react-paypal-js'],
          'framer': ['framer-motion'],
          'leaflet': ['leaflet', 'react-leaflet'],
        }
      }
    },
    chunkSizeWarningLimit: 1000,
  },
  optimizeDeps: {
    exclude: ['firebase/auth', 'firebase/database']
  }
})