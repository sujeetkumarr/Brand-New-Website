import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    // Suppress Three.js warnings at build level
    {
      name: 'suppress-three-warnings',
      transform(code, id) {
        // Patch Three.js to suppress multiple instances warning
        if (id.includes('node_modules/three')) {
          return code.replace(
            /console\.warn\([^)]*Multiple instances of Three[^)]*\)/g,
            '/* suppressed */'
          );
        }
        return null;
      }
    }
  ],
  server: {
    port: 3000,
    open: true,
  },
  build: {
    outDir: 'dist',
    sourcemap: true,
    rollupOptions: {
      output: {
        manualChunks: {
          'three': ['three']
        }
      }
    }
  },
  css: {
    postcss: './postcss.config.js',
  },
  resolve: {
    alias: {
      '@': '/src',
      // Force all Three.js imports to use the singleton
      'three': '/utils/three.ts'
    },
    dedupe: ['three']
  },
  optimizeDeps: {
    include: ['three'],
    exclude: [],
    esbuildOptions: {
      // Ensure Three.js is treated as external/singleton
      keepNames: true
    }
  }
})