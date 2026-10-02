import { defineConfig } from 'vite'
import tailwindcss from '@tailwindcss/vite'
import { resolve } from 'path'

export default defineConfig({
  base: '/filimo/',

  plugins: [
    tailwindcss(),
  ],

  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        filimomad: resolve(__dirname, 'filimomad.html'),
      },
    },
  },
})