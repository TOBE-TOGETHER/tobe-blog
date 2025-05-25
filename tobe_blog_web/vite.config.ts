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
        // 手动配置chunk分割
        manualChunks: {
          // 将React相关库单独打包
          'react-vendor': ['react', 'react-dom', 'react-router-dom'],
          // 将Material-UI相关库单独打包
          'mui-vendor': [
            '@mui/material', 
            '@mui/icons-material', 
            '@mui/x-date-pickers',
            '@mui/x-tree-view',
            '@emotion/react',
            '@emotion/styled'
          ],
          // 将编辑器相关库单独打包
          'editor-vendor': [
            '@wangeditor/editor',
            '@wangeditor/editor-for-react'
          ],
          // 将工具库单独打包
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
        // 为CSS文件使用内容哈希
        assetFileNames: (assetInfo) => {
          const info = assetInfo.name?.split('.') || [];
          const extType = info[info.length - 1];
          if (/\.(png|jpe?g|gif|svg|webp|ico)$/.test(assetInfo.name || '')) {
            return `assets/images/[name].[hash].[ext]`;
          }
          if (/\.(woff2?|eot|ttf|otf)$/.test(assetInfo.name || '')) {
            return `assets/fonts/[name].[hash].[ext]`;
          }
          return `assets/[name].[hash].[ext]`;
        },
        // 为JS文件使用内容哈希
        chunkFileNames: 'assets/js/[name].[hash].js',
        entryFileNames: 'assets/js/[name].[hash].js',
      },
    },
    // 提高chunk大小警告限制
    chunkSizeWarningLimit: 1000,
    // 启用源码映射以便调试（生产环境可关闭）
    sourcemap: false,
    // 压缩设置
    minify: 'terser',
    terserOptions: {
      compress: {
        drop_console: true, // 移除console.log
        drop_debugger: true, // 移除debugger
      },
    },
  },
});
