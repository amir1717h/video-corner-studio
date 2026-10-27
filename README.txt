VIDEO CORNER STUDIO — DEPLOYMENT FIX

This project pins @ffmpeg/ffmpeg and @ffmpeg/core to the same version (0.12.6) and copies their matching ESM files into the exact vendor paths used by index.html. This prevents a mismatched or incomplete FFmpeg bundle.

IMPORTANT: Deploy this ZIP through a Netlify build, not by dragging the ZIP into Netlify's manual deploy area. The build needs npm to install the two pinned dependencies and generate dist/.

Netlify setup:
1. Extract this ZIP on your computer.
2. Put the extracted folder in a Git repository and push it to GitHub/GitLab, then import that repository into Netlify.
3. Build command: npm run build
4. Publish directory: dist
5. Deploy. The included netlify.toml already sets these values.

For a local test:
1. Install Node.js 20 or newer.
2. Run: npm install
3. Run: npm run build
4. Serve the dist folder through a local HTTP server; do not open index.html directly with file://.

The user's video is processed in the browser; it is not uploaded by the app.
