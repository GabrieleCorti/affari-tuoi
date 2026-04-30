import { createServer } from 'node:http';
import { WebSocketServer, WebSocket } from 'ws';

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

const server = createServer((req, res) => {
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
