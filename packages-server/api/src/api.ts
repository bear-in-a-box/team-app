import express from 'express';
import { errorHandling } from '@team-app/shared-utils';
import { testIpcHandler } from './test-ipc-handler';

const app = express();

app.get(
  '/',
  (_req, res) => res.send('Working')
);

app.get(
  '/test-ipc',
  testIpcHandler
);

const TARGET_API_PORT = +(process.env.API_PORT || 3000);

app.listen(TARGET_API_PORT);

errorHandling.topLevel.register(process);
