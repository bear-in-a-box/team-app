import { createServer } from 'http';
import express from 'express';
import socketio from 'socket.io';
import { errorHandling, env } from '@team-app/shared-utils';
import { initRestApi } from './rest';
import { initSocketApi } from './socket';

errorHandling.topLevel.register(process);

function resolveExposedPort(): number {
  return +(env.getters.getEnvNumber('API_REST_PORT') || 3000);
}

(async function run() {
  const expressInst = express();
  const http = createServer(expressInst);
  const socketioInst = socketio(http);

  await Promise.all([
    initRestApi(expressInst),
    initSocketApi(socketioInst)
  ]);

  await new Promise(done => http.listen(resolveExposedPort(), done));
})();
