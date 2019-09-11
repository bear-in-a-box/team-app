import express from 'express';
import { errorHandling } from '@team-app/shared-utils';

const app = express();

app.get(
  '/',
  (_req, res) => res.send('Working')
);

const TARGET_API_PORT = +(process.env.API_PORT || 3000);

app.listen(TARGET_API_PORT);

errorHandling.topLevel.register(process);
