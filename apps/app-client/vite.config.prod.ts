import { defineConfig, Plugin } from 'vite';
import { createHash } from 'crypto';

const CDN_PATH = 'https://cdn.runeslab.com';

function getHash(text) {
  return createHash('sha256').update(text).digest('hex').substring(0, 8);
}

// Add hash to index and fix CDN path
const htmlHashPlugin = {
  name: 'html-hash',
  enforce: 'post',
  generateBundle(options, bundle) {
    const indexHtml = bundle['index.html'];
    // (indexHtml as any).source = (indexHtml as any).source.replaceAll(`${CDN_PATH}/assets`, CDN_PATH);
    indexHtml.fileName = `index.${getHash((indexHtml as any).source)}.html`;
  },
} as Plugin;

export default defineConfig({
  base: CDN_PATH,
  plugins: [htmlHashPlugin],
  build: {
    rollupOptions: {
      output: {
        assetFileNames: '[name]-[hash][extname]',
        chunkFileNames: '[name]-[hash].js',
        entryFileNames: '[name]-[hash].js',
      },
    },
  },
});