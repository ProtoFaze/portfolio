import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000,
    proxy: {
      '/api': {
        target: 'https://mern-portfolio-436904.as.r.appspot.com',
        changeOrigin: true,
        secure: false,
      }
    }
  },
  build: {
    outDir: 'build',
  }
})
