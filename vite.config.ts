import { defineConfig } from 'vite'
import path from 'path'
import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react'


function figmaAssetResolver() {
  return {
    name: 'figma-asset-resolver',
    resolveId(id) {
      if (id.startsWith('figma:asset/')) {
        const filename = id.replace('figma:asset/', '')
        return path.resolve(__dirname, 'src/assets', filename)
      }
    },
  }
}

export default defineConfig({
  plugins: [
    figmaAssetResolver(),
    // The React and Tailwind plugins are both required for Make, even if
    // Tailwind is not being actively used – do not remove them
    react(),
    tailwindcss(),
  ],
  resolve: {
    alias: {
      // Alias @ to the src directory
      '@': path.resolve(__dirname, './src'),
    },
  },

  // File types to support raw imports. Never add .css, .tsx, or .ts files to this.
  assetsInclude: ['**/*.svg', '**/*.csv', '**/*.geojson'],

  build: {
    // Split heavy third-party libraries into their own chunks so the
    // main bundle stays under ~500 KB and the production minifier does
    // not blow the container memory budget during `vite build`.
    rollupOptions: {
      output: {
        manualChunks: {
          'react-vendor': ['react', 'react-dom', 'react-router'],
          'chart-vendor': ['recharts'],
          'map-vendor': ['react-simple-maps', 'd3-geo', 'd3-zoom', 'd3-selection', 'topojson-client'],
          'grid-vendor': ['react-grid-layout'],
        },
      },
    },
    chunkSizeWarningLimit: 700,
  },
})
