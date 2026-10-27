// Copies the pinned FFmpeg.wasm files from node_modules into public/vendor so
// everything is served from YOUR origin (no CDN, no blob: URLs, no CORS issues).
import { cpSync, rmSync, mkdirSync, existsSync, statSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const nm = join(root, 'node_modules', '@ffmpeg');
const out = join(root, 'public', 'vendor');

const jobs = [
  // ESM build of the JS wrapper (index.js, classes.js, worker.js, const.js, errors.js, ...)
  [join(nm, 'ffmpeg', 'dist', 'esm'), join(out, 'ffmpeg')],
  // ESM build of the single-thread core: MUST match the ESM wrapper above
  [join(nm, 'core', 'dist', 'esm'), join(out, 'core')],
];

rmSync(out, { recursive: true, force: true });
for (const [src, dst] of jobs) {
  if (!existsSync(src)) {
    console.error('Missing ' + src + ' - did "npm install" run?');
    process.exit(1);
  }
  mkdirSync(dst, { recursive: true });
  cpSync(src, dst, { recursive: true });
}

for (const f of ['ffmpeg/index.js', 'ffmpeg/worker.js', 'ffmpeg/const.js', 'ffmpeg/errors.js', 'core/ffmpeg-core.js', 'core/ffmpeg-core.wasm']) {
  const p = join(out, f);
  if (!existsSync(p)) { console.error('Expected file missing after copy: ' + p); process.exit(1); }
  console.log('ok  vendor/' + f + '  ' + (statSync(p).size / 1024).toFixed(0) + ' KB');
}
