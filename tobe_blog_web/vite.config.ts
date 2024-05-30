import react from '@vitejs/plugin-react-swc';
import { defineConfig } from 'vite';

// https://vitejs.dev/config/
export default defineConfig({
  envDir: './env',
  plugins: [react()],
  server: {
    port: 8080,
    strictPort: true,
    open: true,
  },
  build: {
    manifest: true,
  },
})
