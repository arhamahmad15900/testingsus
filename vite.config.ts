import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import fs from 'fs';
import { defineConfig } from 'vite';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

function resolveTsExtensionPlugin() {
  return {
    name: 'resolve-ts-extension',
    resolveId(source: string, importer?: string) {
      if (source.startsWith('.') && importer) {
        const ext = path.extname(source);
        if (ext === '.js' || ext === '.ts') {
          const basePath = path.resolve(path.dirname(importer), source.slice(0, -ext.length));
          for (const candidateExt of ['.tsx', '.ts', '.jsx', '.js']) {
            const fullPath = basePath + candidateExt;
            if (fs.existsSync(fullPath)) {
              return fullPath;
            }
          }
        }
      }
      return null;
    }
  };
}

export default defineConfig(() => {
  return {
    plugins: [resolveTsExtensionPlugin(), react(), tailwindcss()],
    resolve: {
      extensions: ['.tsx', '.ts', '.jsx', '.js', '.json'],
      alias: {
        '@': path.resolve(__dirname, '.'),
      },
    },
    server: {
      // HMR is disabled in AI Studio via DISABLE_HMR env var.
      // Do not modify—file watching is disabled to prevent flickering during agent edits.
      hmr: process.env.DISABLE_HMR !== 'true',
      // Disable file watching when DISABLE_HMR is true to save CPU during agent edits.
      watch: process.env.DISABLE_HMR === 'true' ? null : {},
    },
    build: {
      chunkSizeWarningLimit: 1000,
      rollupOptions: {
        output: {
          manualChunks: (id) => {
            if (id.includes('three')) return 'three';
            if (id.includes('gsap')) return 'gsap';
          },
        },
      },
    },
  };
});
