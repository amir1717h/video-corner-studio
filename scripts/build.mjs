import { cp, mkdir, readFile, rm, writeFile } from 'node:fs/promises';
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

const required = [
  'vendor/ffmpeg/index.js',
  'vendor/ffmpeg/classes.js',
  'vendor/ffmpeg/worker.js',
  'vendor/core/ffmpeg-core.js',
  'vendor/core/ffmpeg-core.wasm'
];
for (const file of required) {
  const fullPath = path.join(dist, file);
  const stat = await import('node:fs/promises').then(fs => fs.stat(fullPath));
  if (!stat.isFile() || stat.size < 10) throw new Error(`Required FFmpeg asset missing or empty: ${file}`);
}
console.log('Build complete: FFmpeg wrapper and core assets are bundled locally.');
