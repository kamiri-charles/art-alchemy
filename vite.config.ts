import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  base: 'https://kamiri-charles.github.io/art-alchemy',
  plugins: [react()],
})
