# Shopsync - Shopify Theme Development Boilerplate

An opinionated development environment for Shopify themes with TypeScript, SCSS, and modern tooling.

## Features

- 🛠️ **Opinionated Setup** - TypeScript + SCSS + Modern tooling
- 📝 **Comprehensive Linting** - TypeScript, SCSS, HTML, and Liquid
- 🎨 **Code Formatting** - Prettier integration
- 🔍 **Theme Check** - Liquid validation
- ⚡ **Hot Reloading** - Fast development with file watching
- 🔄 **Separated Build Processes** - JS, CSS, and Liquid handled independently
- 🐛 **Cross-platform** - Works on Windows, macOS, and Linux
- 🚀 **Modern Tooling** - Vite, Sass, TypeScript, PostCSS

## Technology Stack

This boilerplate is built with modern web technologies:

- **TypeScript** - Type-safe JavaScript development
- **SCSS** - Advanced CSS with variables, mixins, and nesting
- **Vite** - Fast build tool and development server
- **Sass** - SCSS compilation
- **PostCSS** - CSS post-processing and optimization
- **ESLint** - TypeScript/JavaScript linting
- **Stylelint** - SCSS/CSS linting
- **Theme Check** - Liquid template validation

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (LTS version, 18+ recommended)
- [npm](https://www.npmjs.com/) (comes with Node.js)
- [Shopify CLI](https://shopify.dev/themes/tools/cli/installation)
- [Ruby](https://www.ruby-lang.org/) (for Theme Check)
- [Git](https://git-scm.com/) (for version control)

### Installation

1. Clone this repository:

   ```bash
   git clone <repository-url>
   cd shopsync
   ```

2. Install Node.js dependencies:

   ```bash
   npm install
   ```

3. Install Theme Check (requires Ruby):
   ```bash
   gem install theme-check
   ```

### Project Structure

```
shopsync/
├── custom/
│   ├── js/          # TypeScript files
│   ├── scss/        # SCSS files
│   └── theme/       # Custom theme files
├── theme/           # Built theme files
├── build-scss.ts    # SCSS build script
├── copy-theme-files.ts # Theme file copy script
└── vite.config.ts   # Vite configuration
```

## Importing or Connecting to a Theme

The recommended way to set up and connect your project is with the Shopsync CLI:

1. **Install the CLI globally (if you haven't already):**

   ```bash
   npm install -g @shopsync/cli
   ```

2. **Initialize your project (optional, if starting fresh):**

   ```bash
   shopsync init my-theme-directory
   cd my-theme-directory
   ```

3. **Connect to your Shopify store and theme:**

   ```bash
   shopsync connect your-store.myshopify.com THEME_ID
   ```

   This will:

   - Write your store and theme ID to `.env` and `shopsync.json`
   - Pull the theme files into the `theme/` directory
   - Set up your local environment for development

4. **Start development:**
   ```bash
   npm install
   npm run dev
   ```

> For more CLI usage, see [`cli/README.md`](./cli/README.md).

## Core Workflow

### Development

```bash
npm run dev          # Watch + serve (recommended)
npm run dev:debug    # With debug logging
```

### Building

```bash
npm run build        # Full build with linting
npm run build:all    # Just the build steps
```

### Individual Tasks

```bash
npm run build:js     # Just TypeScript
npm run build:css    # Just SCSS
npm run build:liquid # Just theme files
```

### Watching Individual Components

```bash
npm run build:js:watch     # Watch TypeScript changes
npm run build:css:watch    # Watch SCSS changes
npm run build:liquid:watch # Watch theme file changes
```

## Development

### Linting

Run all linters:

```bash
npm run lint
```

Run specific linters:

```bash
npm run lint:ts    # TypeScript
npm run lint:css   # SCSS/CSS
npm run lint:html  # HTML
npm run lint:liquid # Liquid
```

### Build Process

This project uses a separated build process for better reliability and performance:

- **TypeScript/JavaScript**: Built with Vite (fast, modern bundler)
- **SCSS/CSS**: Compiled with Sass (advanced CSS preprocessing)
- **Liquid/Theme Files**: Copied with custom TypeScript script
- **Post-processing**: CSS optimization with PostCSS and cssnano

### TypeScript Development

- Write TypeScript in `custom/js/` directory
- Files are compiled to JavaScript in `theme/assets/`
- Full type checking and IntelliSense support
- Source maps for debugging

### SCSS Development

- Write SCSS in `custom/scss/` directory
- Use `@use` for modern Sass imports
- Variables and mixins in `variables.scss`
- Compiled to CSS in `theme/assets/`

### Theme Check

Run Theme Check manually:

```bash
theme-check
```

### VS Code Integration

This project includes VS Code settings for:

- Format on save
- Linting on save
- Editor configuration
- TypeScript IntelliSense

## Configuration Files

- `.editorconfig` - Editor settings
- `.eslintrc.json` - TypeScript/JavaScript linting
- `.stylelintrc.json` - SCSS/CSS linting
- `.htmlhintrc` - HTML linting
- `.theme-check.yml` - Liquid linting
- `.shopify-cli.yml` - Shopify CLI settings
- `.vscode/settings.json` - VS Code settings
- `vite.config.ts` - Vite configuration
- `build-scss.ts` - SCSS build script
- `copy-theme-files.ts` - Theme file copy script
- `tsconfig.json` - TypeScript configuration

## Dependencies

### Development Dependencies

- **Build Tools**: Vite, tsx, Sass
- **Linting**: ESLint, Stylelint, HTMLHint, Theme Check
- **File Watching**: chokidar-cli, concurrently
- **Cross-platform**: cross-env
- **Code Quality**: Prettier, npm-run-all

### Runtime Dependencies

- **Utilities**: chalk (for console output)

## Ignored Files

The following files are ignored during theme sync:

- Development tools and configs
- Node modules
- Git files
- VS Code settings
- Package files
- TypeScript source files
- SCSS source files

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License.


## Roadmap

 - Allow for multiple environments (Shopify themes / stores) to be configured.
 - Developer workflow enhancements
   - Please log any requests in [Issues](https://github.com/dnordby/shopsync/issues).