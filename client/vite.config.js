import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { TanStackRouterVite } from "@tanstack/router-vite-plugin"
import path from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), TanStackRouterVite()],
  resolve: {
    alias: {
      '@views': path.resolve(__dirname, './src/_lib/views/'),
      '@screen': path.resolve(__dirname, './src/_lib/views/screen'),
      '@styles': path.resolve(__dirname, './src/styles/'),
      '@hook': path.resolve(__dirname, './src/_lib/hook'),
      '@colors': path.resolve(__dirname, './src/_lib/colors'),
      '@_lib': path.resolve(__dirname, './src/_lib/'),
      '@studentscreens': path.resolve(__dirname, '././src/_lib/views/screen/student'),
      
    }
  }
})