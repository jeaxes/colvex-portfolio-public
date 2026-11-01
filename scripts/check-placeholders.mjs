// Warns about [placeholders] left in the built HTML, such as an unset copy value.
// Set STRICT=1 to fail the build instead (use this for production).
import { readdirSync, readFileSync, statSync } from 'node:fs';
import { join } from 'node:path';

const walk = (dir) => readdirSync(dir).flatMap((name) => {
  const path = join(dir, name);
  return statSync(path).isDirectory() ? walk(path) : path.endsWith('.html') ? [path] : [];
});
const found = new Map();
for (const file of walk('dist')) {
  const text = readFileSync(file, 'utf8').replace(/<script[\s\S]*?<\/script>|<style[\s\S]*?<\/style>/g, '');
  for (const [match] of text.matchAll(/\[[A-Za-zÄÖÜäöüß][^\]<>"]{0,40}\]/g)) {
    if (!found.has(match)) found.set(match, new Set());
    found.get(match).add(file.replace(/^dist/, ''));
  }
}

if (found.size === 0) {
  console.log('✓ No placeholders in dist/');
} else {
  for (const [value, files] of found) console.warn(`⚠ Placeholder ${value} in ${[...files].join(', ')}`);
  if (process.env.STRICT === '1') process.exit(1);
}
