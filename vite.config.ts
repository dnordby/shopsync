import glob from 'glob';
import { resolve } from 'path';
import { defineConfig } from 'vite';

// Get all TypeScript and SCSS entry points
const jsEntries = glob
  .sync('custom/js/**/*.ts')
  .reduce((acc: Record<string, string>, file: string) => {
    const name = file.replace('custom/js/', '').replace('.ts', '');
    acc[name] = resolve(__dirname, file);
    return acc;
  }, {});

const scssEntries = glob
  .sync('custom/scss/**/*.scss')
  .filter((file) => !file.includes('variables.scss')) // Exclude variables.scss
  .reduce((acc: Record<string, string>, file: string) => {
    const name = file.replace('custom/scss/', '').replace('.scss', '');
    acc[name] = resolve(__dirname, file);
    return acc;
  }, {});

export default defineConfig({
  root: 'custom',
  build: {
    outDir: '../theme/assets',
    emptyOutDir: false,
    minify: false,
    sourcemap: true,
    watch: {
      include: ['custom/**/*'],
    },
    rollupOptions: {
      input: {
        ...jsEntries,
        ...scssEntries,
      },
      output: {
        entryFileNames: (chunkInfo) => {
          const name = chunkInfo.name;
          return name.endsWith('.scss') ? `${name}.css` : `${name}.js`;
        },
        chunkFileNames: '[name].js',
        assetFileNames: (assetInfo) => {
          const info = assetInfo as { type: string };
          if (
            info.type === 'asset' &&
            assetInfo.source.toString().includes('/*')
          ) {
            return '[name].css';
          }
          return '[name].[ext]';
        },
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
  css: {
    devSourcemap: true,
    preprocessorOptions: {
      scss: {
        additionalData: `@use "${resolve(__dirname, 'custom/scss/variables.scss')}" as *;`,
      },
    },
  },
});
