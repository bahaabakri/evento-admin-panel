import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  css: {
    preprocessorOptions: {
      scss: {
        // additionalData: `@use "src/styles/variables.scss" as *;`
      }
    }
  },
  resolve: {
    alias: {
      '@': "/src",
    },
  },
})
