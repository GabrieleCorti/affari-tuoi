import { WebSocketServer, WebSocket } from 'ws';
import { getState, setBroadcast } from './state';
import type { IncomingMessage } from 'node:http';
import type { Duplex } from 'node:stream';

declare global {
  var __wss: WebSocketServer | undefined;
}

export function getWSS(): WebSocketServer {
  if (!globalThis.__wss) {
    globalThis.__wss = new WebSocketServer({ noServer: true });

    globalThis.__wss.on('connection', (ws) => {
      ws.send(JSON.stringify(getState()));
    });

    setBroadcast((state) => {
      const msg = JSON.stringify(state);
      globalThis.__wss!.clients.forEach((c) => {
        if (c.readyState === WebSocket.OPEN) c.send(msg);
      });
    });
  }
  return globalThis.__wss;
}

export function handleUpgrade(req: IncomingMessage, socket: Duplex, head: Buffer): void {
  const wss = getWSS();
  wss.handleUpgrade(req, socket as any, head, (ws) => {
    wss.emit('connection', ws, req);
  });
}
