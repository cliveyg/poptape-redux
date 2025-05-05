import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import commonjs from 'vite-plugin-commonjs'

//TODO: put server names into .env files

export default defineConfig({
  plugins: [react(),commonjs()],
  server: {
    allowedHosts: ['poptape.local'],
    hmr: {
      host: 'poptape.local',
      protocol: 'ws',
    },
  },
})
