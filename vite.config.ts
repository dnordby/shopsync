/**
 * Vite Configuration for Shopify Theme Development
 *
 * This configuration handles TypeScript compilation and bundling for the theme's
 * JavaScript assets. It includes:
 * - TypeScript compilation with ES2020 target
 * - Source map generation for debugging
 * - Custom entry point discovery from custom/js directory
 * - Development server with hot reload
 * - Production build optimization
 */

import glob from 'glob';
import { resolve } from 'path';
import { defineConfig } from 'vite';

// Get all TypeScript entry points from custom/js directory
const jsFiles = glob
  .sync('custom/js/**/*.ts')
  .map((file) => resolve(__dirname, file));

export default defineConfig({
  root: 'custom',
  build: {
    outDir: '../theme/assets',
    emptyOutDir: false,
    minify: false,
    sourcemap: true,
    rollupOptions: {
      input: jsFiles,
      output: {
        entryFileNames: '[name].js',
        chunkFileNames: '[name].js',
        assetFileNames: '[name].[ext]',
      },
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
  esbuild: {
    target: 'es2020',
  },
  optimizeDeps: {
    esbuildOptions: {
      target: 'es2020',
    },
  },
});
