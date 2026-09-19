import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import fs from 'node:fs';
import path from 'node:path';

function sourceStaticPlugin() {
  return {
    name: 'source-static-plugin',
    configureServer(server) {
      server.middlewares.use((req, res, next) => {
        if (req.url && req.url.startsWith('/source/')) {
          try {
            const rawPath = req.url.split('?')[0].replace(/^\/source\//, '');
            const decodedPath = decodeURIComponent(rawPath);
            const fullPath = path.join(__dirname, 'public', 'source', decodedPath);
            if (fs.existsSync(fullPath) && fs.statSync(fullPath).isFile()) {
              const ext = path.extname(fullPath).toLowerCase();
              const mimeTypes = {
                '.png': 'image/png',
                '.jpg': 'image/jpeg',
                '.jpeg': 'image/jpeg',
                '.webp': 'image/webp',
                '.gif': 'image/gif',
                '.mp4': 'video/mp4',
                '.mov': 'video/quicktime',
                '.pdf': 'application/pdf',
                '.docx': 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
                '.xlsx': 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
                '.txt': 'text/plain; charset=utf-8',
                '.zip': 'application/zip',
              };
              res.setHeader('Content-Type', mimeTypes[ext] || 'application/octet-stream');
              res.setHeader('Cache-Control', 'public, max-age=86400');
              return fs.createReadStream(fullPath).pipe(res);
            }
          } catch (e) {
            console.error('sourceStaticPlugin error:', e);
          }
        }
        next();
      });
    },
  };
}

// https://vite.dev/config/
export default defineConfig({
  base: './',
  plugins: [react(), sourceStaticPlugin()],
  define: {
    __BUILD_TIME__: JSON.stringify(new Date().toISOString()),
  },
  server: {
    headers: {
      'Cache-Control': 'no-cache, no-store, must-revalidate',
    },
  },
});

