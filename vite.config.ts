import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// The Spring backend runs on :8080 and its CORS only allows a single origin.
// Proxying /api through the Vite dev server means the browser only ever talks
// to the dev origin — so there are no CORS problems and no backend changes.
const proxy = {
  '/api': {
    target: 'http://localhost:8080',
    changeOrigin: true,
  },
};

export default defineConfig({
  plugins: [react()],
  server: { port: 3000, proxy },
  preview: { port: 4173, proxy },
});
