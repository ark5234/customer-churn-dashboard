import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000,
    open: true
  },
  build: {
    outDir: 'dist',
    sourcemap: true,
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom'],
          charts: ['chart.js', 'react-chartjs-2'],
          csv: ['papaparse', 'react-dropzone']
        }
      }
    }
  },
  optimizeDeps: {
    include: ['react', 'react-dom', 'chart.js', 'react-chartjs-2', 'papaparse', 'react-dropzone']
  }
})