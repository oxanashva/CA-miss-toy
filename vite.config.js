import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import svgr from 'vite-plugin-svgr'

// https://vite.dev/config/
export default defineConfig({
  base: '/CA-miss-toy/',
  plugins: [
    react(),
    svgr({
      svgrOptions: {
        icon: true, // make it scale relative to the 'font-size'
      },
    }),
  ],
})
