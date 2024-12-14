import react from '@vitejs/plugin-react-swc';
import { defineConfig } from 'vite';
import { createHtmlPlugin } from 'vite-plugin-html';
import config from './customization.json';

function buildInjectedScript(): string {
  return `${buildGoogleTagScript()}`;
}

function buildGoogleTagScript(): string {
  return `<meta name="og:title" content="${config.slogan} ｜ ${config.projectName}" >
    <meta property="og:site_name" content="${config.projectName}">
    <meta property="og:type" content="article">
    <meta property="og:description" content="${config.description}">
    <meta name="keywords" content="${config.keywords}" >
    <meta property="og:url" content="/">` + config?.googleAnalyticsId
    ? `<script async src="https://www.googletagmanager.com/gtag/js?id=${config.googleAnalyticsId}"></script>
    <script>
      window.dataLayer = window.dataLayer || [];
      function gtag(){dataLayer.push(arguments);}
      gtag('js', new Date());
      gtag('config', '${config.googleAnalyticsId}');
    </script>`
    : '';
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
