import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vite.dev/config/
export default defineConfig({
  plugins: [vue()],
  server: {
    port: 3000,           // Custom port (change to whatever you want)
    open: true,           // Auto-open browser when server starts
    host: true,           // Listen on all network interfaces
    strictPort: false,    // If port is in use, try the next available port
  }
})
