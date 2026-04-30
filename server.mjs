import { createServer } from 'node:http';
import { readFile } from 'node:fs/promises';
import { existsSync } from 'node:fs';
import { join, extname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { WebSocketServer, WebSocket } from 'ws';

const MIME = {
  '.css': 'text/css',
  '.js': 'application/javascript',
  '.mjs': 'application/javascript',
  '.html': 'text/html',
  '.ico': 'image/x-icon',
  '.svg': 'image/svg+xml',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.mp3': 'audio/mpeg',
  '.webp': 'image/webp',
};

async function serveStatic(req, res) {
  const clientDir = fileURLToPath(new URL('./dist/client', import.meta.url));
  const filePath = join(clientDir, req.url.split('?')[0]);
  if (existsSync(filePath)) {
    const ext = extname(filePath);
    const data = await readFile(filePath);
    res.writeHead(200, { 'Content-Type': MIME[ext] ?? 'application/octet-stream' });
    res.end(data);
    return true;
  }
  return false;
}

// Register broadcast on globalThis BEFORE the Astro bundle initializes state.ts
const wss = new WebSocketServer({ noServer: true });

wss.on('connection', (ws) => {
  if (globalThis.__gameState) {
    ws.send(JSON.stringify(globalThis.__gameState));
  }
});

globalThis.__broadcast = (state) => {
  const msg = JSON.stringify(state);
  wss.clients.forEach((c) => {
    if (c.readyState === WebSocket.OPEN) c.send(msg);
  });
};

// Dynamic import so it runs AFTER the globals above are set
const { handler } = await import('./dist/server/entry.mjs');

const server = createServer(async (req, res) => {
  if (await serveStatic(req, res)) return;
  handler(req, res, () => {
    res.writeHead(404).end();
  });
});

server.on('upgrade', (req, socket, head) => {
  if (req.url === '/ws') {
    wss.handleUpgrade(req, socket, head, (ws) => {
      wss.emit('connection', ws, req);
    });
  }
});

const port = process.env.PORT ?? 4321;
server.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
