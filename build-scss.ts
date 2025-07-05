import { resolve, dirname } from 'path';
import { existsSync, mkdirSync, writeFileSync } from 'fs';
import { fileURLToPath } from 'url';
import * as sass from 'sass';
import glob from 'glob';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// SCSS build script
const buildScss = async (): Promise<void> => {
  const scssFiles: string[] = glob
    .sync('custom/scss/**/*.scss')
    .filter((file: string) => !file.includes('variables.scss')); // Exclude variables.scss

  const outputDir: string = resolve(__dirname, 'theme/assets');

  // Ensure output directory exists
  if (!existsSync(outputDir)) {
    mkdirSync(outputDir, { recursive: true });
  }

  for (const scssFile of scssFiles) {
    try {
      // Get the base name without extension
      const baseName: string = scssFile
        .replace('custom/scss/', '')
        .replace('.scss', '');

      // Compile SCSS to CSS
      const result: sass.CompileResult = sass.compile(scssFile, {
        loadPaths: [resolve(__dirname, 'custom/scss')],
        style: 'compressed',
        sourceMap: true,
      });

      // Write CSS file
      const cssPath: string = resolve(outputDir, `${baseName}.css`);
      writeFileSync(cssPath, result.css);

      // Write source map if available
      if (result.sourceMap) {
        const mapPath: string = resolve(outputDir, `${baseName}.css.map`);
        writeFileSync(mapPath, JSON.stringify(result.sourceMap));
      }

      console.log(`✓ Compiled: ${scssFile} → ${baseName}.css`);
    } catch (error) {
      console.error(`✗ Error compiling ${scssFile}:`, error);
    }
  }
};

buildScss().catch(console.error);
