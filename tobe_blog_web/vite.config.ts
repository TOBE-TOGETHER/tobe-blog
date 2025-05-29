import react from '@vitejs/plugin-react-swc';
import { defineConfig } from 'vite';
import { createHtmlPlugin } from 'vite-plugin-html';
import config from './customization.json';

function buildInjectedScript(): string {
  return `${buildGoogleTagScript()}`;
}

function buildGoogleTagScript(): string {
  return `<meta name="og:title" content="${config.slogan} ｜ ${config.title}" />
    <meta name="og:site_name" content="${config.title}" />
    <meta name="og:type" content="article" />
    <meta name="og:description" content="${config.description}" />
    <meta name="description" content="${config.description}" />
    <meta name="og:image" content="${config.image}" />
    <meta name="og:url" content="/" />
    <meta name="keywords" content="${config.keywords}" />
    <script async src="https://www.googletagmanager.com/gtag/js?id=${config.googleAnalyticsId}"></script>
    <script>
      window.dataLayer = window.dataLayer || [];
      function gtag(){dataLayer.push(arguments);}
      gtag('js', new Date());
      gtag('config', '${config.googleAnalyticsId}');
    </script>`;
}

// https://vitejs.dev/config/
export default defineConfig({
  envDir: './env',
  plugins: [
    react(),
    createHtmlPlugin({
      minify: true,
      entry: 'src/main.tsx',
      template: 'index.html',
      inject: {
        data: {
          title: config.title,
          injectScript: buildInjectedScript(),
        },
        tags: [
          {
            injectTo: 'body-prepend',
            tag: 'div',
            attrs: {
              id: 'tag',
            },
          },
        ],
      },
    }),
  ],
  server: {
    port: 3000,
    strictPort: true,
    open: true,
  },
  build: {
    manifest: true,
    rollupOptions: {
      output: {
        // Manual chunk splitting configuration
        manualChunks: {
          // Bundle React-related libraries separately
          'react-vendor': ['react', 'react-dom', 'react-router-dom'],
          // Bundle Material-UI related libraries separately
          'mui-vendor': [
            '@mui/material', 
            '@mui/icons-material', 
            '@mui/x-date-pickers',
            '@mui/x-tree-view',
            '@emotion/react',
            '@emotion/styled'
          ],
          // Bundle editor-related libraries separately
          'editor-vendor': [
            '@wangeditor/editor',
            '@wangeditor/editor-for-react'
          ],
          // Bundle utility libraries separately
          'utils-vendor': [
            'axios',
            'moment',
            'i18next',
            'i18next-browser-languagedetector',
            'i18next-http-backend',
            'react-i18next',
            'notistack'
          ],
        },
        // Use content hash for CSS files
        assetFileNames: (assetInfo) => {
          const info = assetInfo.name?.split('.') ?? [];
          const extType = info[info.length - 1];
          if (/\.(png|jpe?g|gif|svg|webp|ico)$/.test(assetInfo.name ?? '')) {
            return `assets/images/[name].[hash].[ext]`;
          }
          if (/\.(woff2?|eot|ttf|otf)$/.test(assetInfo.name ?? '')) {
            return `assets/fonts/[name].[hash].[ext]`;
          }
          return `assets/[name].[hash].[ext]`;
        },
        // Use content hash for JS files
        chunkFileNames: 'assets/js/[name].[hash].js',
        entryFileNames: 'assets/js/[name].[hash].js',
      },
    },
    // Increase chunk size warning limit
    chunkSizeWarningLimit: 1000,
    // Enable source maps for debugging (can be disabled in production)
    sourcemap: false,
    // Minification settings
    minify: 'terser',
    terserOptions: {
      compress: {
        drop_console: true, // Remove console.log
        drop_debugger: true, // Remove debugger
      },
    },
  },
});
