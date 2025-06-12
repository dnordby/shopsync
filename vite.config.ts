import { defineConfig } from 'vite';

export default defineConfig({
  root: 'custom',
  build: {
    outDir: '../dist/assets',
    emptyOutDir: true,
    rollupOptions: {
      input: 'custom/index.html',
    },
  },
  server: {
    port: 5173,
    strictPort: true,
    host: true,
    watch: {
      usePolling: true,
      interval: 100,
    },
  },
});
