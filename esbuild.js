require('esbuild').build({
    entryPoints: [
        "./src/background.ts",
        "./src/content.ts",
        "./src/popup.tsx",
    ],
    bundle: true,
    minify: true,
    sourcemap: 'inline',
    target: ["chrome89", "firefox91", "safari15", "ios15"],
    outdir: './dist/build',
    loader: { '.eot': 'file', '.woff': 'file', '.woff2': 'file', '.ttf': 'file', '.svg': 'file', '.html': 'file' }
}).catch(() => process.exit(1))