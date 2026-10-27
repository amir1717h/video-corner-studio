# Video Corner Studio (Netlify)

Static site. FFmpeg.wasm is self-hosted from your own origin (no CDN, no blob: URLs).

## Deploy
1. Unzip, keep this exact structure (`public/`, `scripts/`, `package.json`, `netlify.toml`).
2. Push to a Git repo and import it in Netlify  (or run `npx netlify deploy --build --prod` from this folder).
   Netlify reads `netlify.toml`: build = `npm install && node scripts/copy-ffmpeg.mjs`, publish dir = `public`.
   The build log must show `ok vendor/core/ffmpeg-core.wasm ...`.
   NOTE: dragging the folder into Netlify "Deploy manually" does NOT run the build, so
   /vendor/ would be missing; the app then shows a clear "ffmpeg-core.wasm was not deployed" message.
   Alternative for drag-and-drop: run `npm install && node scripts/copy-ffmpeg.mjs` locally, then drag the `public` folder.
3. Open the site, choose an MP4, export. Open "Diagnostics" for stage-by-stage logs and the loaded
   core's real codec support (libvpx-vp9 / prores_ks / alphamerge).

Do not add a Content-Security-Policy header unless it allows `script-src 'self' 'wasm-unsafe-eval'` and `worker-src 'self'`.
