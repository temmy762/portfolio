# CSS Configuration and Tailwind Setup

## Overview

This project uses Tailwind CSS v3.4.1 with Next.js 15.3.2, which relies on CSS directives like `@tailwind` and `@layer`. These directives might show as errors in some code editors, but they are valid when processed by the Tailwind CSS compiler.

## Configuration Files

- **tailwind.config.js**: Main Tailwind configuration
- **postcss.config.js/mjs**: PostCSS plugins configuration 
- **.stylelintrc.json**: Stylelint rules for CSS linting
- **.stylelintignore**: Tells Stylelint to ignore CSS files with Tailwind directives
- **globals.css**: Main CSS file with Tailwind directives

## Important Notes

1. **ES Modules vs CommonJS**
   - This project uses ES Modules (`"type": "module"` in package.json)
   - Tailwind config uses ES module syntax with import/export

2. **PostCSS Configuration**
   - Use `tailwindcss` plugin name (not `@tailwindcss/postcss`)
   - Ensure compatibility with Tailwind CSS v3.4.1

3. **Module Type Warnings**
   - If you see module type warnings, ensure `"type": "module"` is in package.json
   - This allows ES module syntax in JS files
3. Use the CSS snippets provided in `.vscode/css.code-snippets` for consistent Tailwind directives

### Linting and Fixing CSS

To run CSS linting and auto-fix issues:

```bash
npm run lint
```

This will run both ESLint for JavaScript/TypeScript and Stylelint for CSS files.

## Additional Plugins

We use several PostCSS plugins to enhance the CSS processing:

- **postcss-import**: For importing CSS files
- **tailwindcss**: The core Tailwind CSS processor
- **postcss-nested**: For nested CSS syntax
- **autoprefixer**: For adding vendor prefixes
- **postcss-reporter**: For better error reporting

> **Note:** We previously used `@tailwindcss/postcss` which is for Tailwind CSS v4. We've reverted to using the standard `tailwindcss` plugin for compatibility with Tailwind CSS v3.4.1.

## VS Code Integration

The `.vscode/settings.json` file contains settings optimized for Tailwind CSS development, including:

- Disabled built-in CSS validation (in favor of Stylelint)
- File associations for CSS as PostCSS
- IntelliSense for Tailwind classes in template strings
- Auto-fixing on save with Stylelint
