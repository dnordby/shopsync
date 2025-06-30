import glob from 'glob';
import { resolve } from 'path';
import { defineConfig } from 'vite';
import { existsSync, mkdirSync, copyFileSync, readFileSync } from 'fs';
import type { Plugin } from 'vite';
import chalk from 'chalk';

// Custom plugin to copy theme files
const copyThemeFiles = (): void => {
  const targetThemeDir: string = resolve(__dirname, 'theme');

  // Get all files from custom/theme directory recursively
  const customFiles: string[] = glob.sync('custom/theme/**/*', { nodir: true });

  customFiles.forEach((file: string) => {
    const relativePath: string = file.replace('custom/theme/', '');
    const targetPath: string = resolve(targetThemeDir, relativePath);
    const sourcePath: string = resolve(__dirname, file);

    // Ensure target directory exists
    const targetDir: string = targetPath.substring(
      0,
      targetPath.lastIndexOf('/'),
    );
    if (!existsSync(targetDir)) {
      mkdirSync(targetDir, { recursive: true });
    }

    if (existsSync(targetPath)) {
      // Compare file contents
      const sourceContent = readFileSync(sourcePath, 'utf8');
      const targetContent = readFileSync(targetPath, 'utf8');
      if (sourceContent !== targetContent) {
        console.warn(
          chalk.bgYellowBright.black(
            `CONFLICT: ${file} differs from existing file at ${targetPath}. Please review and merge manually.`,
          ),
        );
      }
      return;
    }

    // Copy file (only if it doesn't exist)
    try {
      copyFileSync(sourcePath, targetPath);
      console.log(`Copied: ${file} -> ${targetPath}`);
    } catch (error) {
      console.error(`Error copying ${file}:`, error);
    }
  });
};

const themeCopyPlugin = (): Plugin => {
  return {
    name: 'theme-copy',
    buildStart() {
      copyThemeFiles();
    },
    handleHotUpdate({ file }: { file: string }) {
      if (file.includes('custom/theme/')) {
        copyThemeFiles();
      }
    },
  };
};

// Get all TypeScript and SCSS entry points
const jsEntries: Record<string, string> = glob
  .sync('custom/js/**/*.ts')
  .reduce((acc: Record<string, string>, file: string) => {
    const name: string = file.replace('custom/js/', '').replace('.ts', '');
    acc[name] = resolve(__dirname, file);
    return acc;
  }, {});

const scssEntries: Record<string, string> = glob
  .sync('custom/scss/**/*.scss')
  .filter((file: string) => !file.includes('variables.scss')) // Exclude variables.scss
  .reduce((acc: Record<string, string>, file: string) => {
    const name: string = file.replace('custom/scss/', '').replace('.scss', '');
    acc[name] = resolve(__dirname, file);
    return acc;
  }, {});

export default defineConfig({
  root: 'custom',
  plugins: [themeCopyPlugin()],
  build: {
    outDir: '../theme/assets',
    emptyOutDir: false,
    minify: false,
    sourcemap: true,
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
