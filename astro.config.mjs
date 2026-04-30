// @ts-check
import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';
import node from '@astrojs/node';

/** @type {import('vite').Plugin} */
const webSocketPlugin = {
  name: 'websocket-dev',
  configureServer(server) {
    server.httpServer?.on('upgrade', async (req, socket, head) => {
      if (req.url !== '/ws') return;
      const { handleUpgrade } = await import('./src/lib/wsManager.ts');
      handleUpgrade(req, socket, head);
    });
  },
};

export default defineConfig({
  vite: {
    plugins: [tailwindcss(), webSocketPlugin],
  },
  output: 'server',
  adapter: node({ mode: 'middleware' }),
});
