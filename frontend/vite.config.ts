import { defineConfig } from 'vite';

export default defineConfig({
  server: {
    proxy: {
      '/api': {
        target: 'http://localhost:8080',
        changeOrigin: true,
      },
    },
  },
  build: {
    // Output goes straight into the Quarkus static resources folder.
    // Phase 2A keeps this as a plain dist/ build; the Dockerfile copies it
    // into the backend during the image build (see backend/Dockerfile).
    outDir: 'dist',
  },
});
