import react from '@vitejs/plugin-react-swc';
import { defineConfig } from 'vite';
import { createHtmlPlugin } from 'vite-plugin-html';
import config from './customization.json';

function buildInjectedScript(): string {
  return `${buildGoogleTagScript()}`
}

function buildGoogleTagScript(): string {
  return config?.googleAnalyticsId ? 
  (`<script async src="https://www.googletagmanager.com/gtag/js?id=${config.googleAnalyticsId}"></script>
    <script>
      window.dataLayer = window.dataLayer || [];
      function gtag(){dataLayer.push(arguments);}
      gtag('js', new Date());
      gtag('config', '${config.googleAnalyticsId}');
    </script>`) : '';
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
          title: config.projectName,
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
  },
});