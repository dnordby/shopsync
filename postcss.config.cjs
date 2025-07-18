/**
 * PostCSS configuration for CSS optimization
 * Uses cssnano to minify and optimize CSS output
 */

module.exports = {
  plugins: [require("cssnano")({ preset: "default" })],
};
