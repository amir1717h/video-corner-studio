VIDEO CORNER STUDIO — NETLIFY BUILD FIX v2

IMPORTANT: The project files are at the ZIP root. Do not keep them inside an extra nested folder in the GitHub repository.

Netlify settings:
- Base directory: leave blank
- Build command: npm run build
- Publish directory: dist

This build pins @ffmpeg/ffmpeg and @ffmpeg/core to the same version and bundles their ESM assets locally. The build fails if wrapper/core files are missing or suspiciously small, instead of publishing an incomplete app.

To use:
1. Extract this ZIP.
2. Upload the CONTENTS of this folder to the ROOT of the existing GitHub repository, replacing the old files.
3. In Netlify, confirm the settings above and trigger a fresh deploy with cache cleared if offered.

Local build requires Node.js 20+ and internet access for npm install:
  npm install
  npm run build

Video processing runs in the browser; videos are not uploaded by this app.
