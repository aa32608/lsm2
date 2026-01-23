import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig(({ command, mode, isSsrBuild }) => {
  const isSSR = isSsrBuild || process.argv.includes('--ssr');
  return {
    plugins: [react()],
    build: {
      rollupOptions: {
        output: {
          manualChunks: isSSR ? undefined : {
            'vendor-firebase': ['firebase/app', 'firebase/auth', 'firebase/database'],
            'vendor-react': ['react', 'react-dom', 'framer-motion'],
          }
        }
      },
      chunkSizeWarningLimit: 1000,
    },
    ssr: {
      noExternal: ['react-helmet-async']
    }
  };
})
