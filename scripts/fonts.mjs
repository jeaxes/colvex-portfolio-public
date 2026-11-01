// Copies the self-hosted fonts (SIL OFL 1.1) from the Fontsource packages to public/fonts/.
// Fixed file names allow <link rel="preload"> in <head>; runs before every build.
import { copyFileSync, mkdirSync } from 'node:fs';
import { createRequire } from 'node:module';
import { dirname, join } from 'node:path';

const require = createRequire(import.meta.url);
const dir = (pkg) => join(dirname(require.resolve(`${pkg}/package.json`)), 'files');
const fonts = [
  ['@fontsource/albert-sans', 'albert-sans-latin-400-normal.woff2'],
  ['@fontsource/albert-sans', 'albert-sans-latin-500-normal.woff2'],
  ['@fontsource/albert-sans', 'albert-sans-latin-600-normal.woff2'],
  ['@fontsource/albert-sans', 'albert-sans-latin-700-normal.woff2'],
  ['@fontsource/ibm-plex-mono', 'ibm-plex-mono-latin-400-normal.woff2'],
];

mkdirSync('public/fonts', { recursive: true });
for (const [pkg, file] of fonts) copyFileSync(join(dir(pkg), file), join('public/fonts', file));
copyFileSync(join(dirname(require.resolve('@fontsource/albert-sans/package.json')), 'LICENSE'), 'public/fonts/OFL-albert-sans.txt');
copyFileSync(join(dirname(require.resolve('@fontsource/ibm-plex-mono/package.json')), 'LICENSE'), 'public/fonts/OFL-ibm-plex-mono.txt');
console.log(`✓ ${fonts.length} fonts copied to public/fonts/`);
