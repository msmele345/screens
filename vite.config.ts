import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
// export default defineConfig({
//   plugins: [react()],
// })


export default defineConfig({
  base: "/",
  plugins: [react()],
  preview: {
   port: 8082,
   strictPort: true,
  },
  server: {
    watch: {
      usePolling: true
    },
   port: 8082,
   strictPort: true,
   host: true,
   origin: "http://0.0.0.0:8082",
  },
 });