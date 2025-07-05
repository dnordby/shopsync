# Shopsync - Shopify Theme Development Boilerplate

A development environment for Shopify themes with pre-configured linting, formatting, and development tools.

## Features

- 🛠️ Pre-configured development tools
- 📝 Linting for TypeScript, SCSS, HTML, and Liquid
- 🎨 Code formatting with Prettier
- 🔍 Theme Check for Liquid validation
- ⚡ Hot reloading for development

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (LTS version)
- [Shopify CLI](https://shopify.dev/themes/tools/cli/installation)
- [Ruby](https://www.ruby-lang.org/) (for Theme Check)

### Installation

1. Clone this repository:
   ```bash
   git clone <repository-url>
   cd shopsync
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Install Theme Check:
   ```bash
   gem install theme-check
   ```

### Importing a Theme

1. Update the store URL in `.shopify-cli.yml`:
   ```yaml
   development:
     store: your-store.myshopify.com
   ```

2. Pull the theme:
   ```bash
   shopify theme pull
   ```
   This will:
   - Download the theme files
   - Update the theme ID in `.shopify-cli.yml`
   - Set up the development environment

3. Start development:
   ```bash
   shopify theme dev
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

## Configuration Files

- `.editorconfig` - Editor settings
- `.eslintrc.json` - TypeScript/JavaScript linting
- `.stylelintrc.json` - SCSS/CSS linting
- `.htmlhintrc` - HTML linting
- `.theme-check.yml` - Liquid linting
- `.shopify-cli.yml` - Shopify CLI settings
- `.vscode/settings.json` - VS Code settings

## Ignored Files

The following files are ignored during theme sync:
- Development tools and configs
- Node modules
- Git files
- VS Code settings
- Package files

## Contributing

1. Fork the repository
2. Create your feature branch
3. Commit your changes
4. Push to the branch
5. Create a Pull Request
