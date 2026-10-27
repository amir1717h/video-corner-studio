import { cp, mkdir, readFile, rm, stat, writeFile } from 'node:fs/promises';
import path from 'node:path';

const root = process.cwd();
const dist = path.join(root, 'dist');
const modules = path.join(root, 'node_modules');

await rm(dist, { recursive: true, force: true });
await mkdir(path.join(dist, 'vendor', 'ffmpeg'), { recursive: true });
await mkdir(path.join(dist, 'vendor', 'core'), { recursive: true });
await cp(path.join(root, 'index.html'), path.join(dist, 'index.html'));
await cp(path.join(modules, '@ffmpeg', 'ffmpeg', 'dist', 'esm'), path.join(dist, 'vendor', 'ffmpeg'), { recursive: true });
await cp(path.join(modules, '@ffmpeg', 'core', 'dist', 'esm'), path.join(dist, 'vendor', 'core'), { recursive: true });
await writeFile(path.join(dist, '_headers'), '/*\n  X-Content-Type-Options: nosniff\n\n/vendor/core/*.wasm\n  Content-Type: application/wasm\n');

const minimumSizes = {
  'vendor/ffmpeg/index.js': 1000,
  'vendor/ffmpeg/classes.js': 1000,
  'vendor/ffmpeg/worker.js': 1000,
  'vendor/core/ffmpeg-core.js': 100000,
  'vendor/core/ffmpeg-core.wasm': 1000000
};
for (const [file, minBytes] of Object.entries(minimumSizes)) {
  const fullPath = path.join(dist, file);
  let size = 0;
  try { size = (await stat(fullPath)).size; } catch {}
  if (size < minBytes) throw new Error(`FFmpeg asset missing or incomplete: ${file} (${size} bytes; expected at least ${minBytes}).`);
}
console.log('Build complete: local FFmpeg ESM wrapper and matching core assets are present.');
