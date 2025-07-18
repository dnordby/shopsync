/**
 * Theme Files Copy Script
 *
 * This script copies Liquid template files from the custom/theme directory to the
 * theme directory. It handles:
 * - Recursive copying of all theme files (templates, sections, snippets, etc.)
 * - Environment-aware conflict detection (only in production)
 * - Automatic directory creation
 * - Conflict reporting for manual resolution
 *
 * Usage: npm run build:liquid
 */

import { resolve, dirname } from 'path';
import { existsSync, mkdirSync, copyFileSync, readFileSync } from 'fs';
import glob from 'glob';
import chalk from 'chalk';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const copyThemeFiles = (): void => {
  const environment: string = process.env.NODE_ENV || 'dev';
  const isDev: boolean = environment === 'dev';
  const targetThemeDir: string = resolve(__dirname, 'theme');
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

    if (existsSync(targetPath) && !isDev) {
      // Compare file contents if not in development mode
      const sourceContent: string = readFileSync(sourcePath, 'utf8');
      const targetContent: string = readFileSync(targetPath, 'utf8');
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

copyThemeFiles();
