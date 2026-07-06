# Premium Product Designer Portfolio

This is a code bundle for the Premium Product Designer Portfolio, exported from Figma Make. The original project is available at https://www.figma.com/design/q0V21iAM23FENRthiKbtBq/Premium-Product-Designer-Portfolio.

## Requirements

- Node.js 18 or newer (Node 20/22 recommended)
- npm 9+ (comes with Node)

## Running the code

1. Open this folder in VS Code.
2. Open a terminal in VS Code (`` Ctrl+` `` / `` Cmd+` ``) and run:

   ```bash
   npm install
   ```

3. Start the dev server:

   ```bash
   npm run dev
   ```

4. Vite will print a local URL (usually `http://localhost:5173`). Open it in your browser.

## Building for production

```bash
npm run build
```

This outputs a static, deployable site to the `dist/` folder — you can drag that folder straight into Netlify, Vercel, or any static host.

## Project structure

- `src/app/App.tsx` — the entire site (all pages/sections live in this one file as a single-page app with client-side view switching).
- `src/app/components/ui/` — pre-built shadcn/ui components (buttons, dialogs, etc.) used throughout the site.
- `src/styles/` — global styles, fonts, and the color/typography theme (edit `theme.css` to change the color palette).

## Troubleshooting

- **"Cannot find module 'react'" or similar red errors in VS Code right after opening:** just run `npm install` — until dependencies are installed, the editor will show these.
- **Port already in use:** stop other dev servers, or run `npm run dev -- --port 3000` to use a different port.
- **Blank page in browser:** check the browser console and the VS Code terminal for the actual error and share it — the app itself has no environment variables or API keys to configure, so it should run immediately after `npm install`.
