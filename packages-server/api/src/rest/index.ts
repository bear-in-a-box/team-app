import { Express } from 'express';
import bodyParser from 'body-parser';
import compression from 'compression';

import { ApiRestActions } from './actions';
import { actionset } from './actionset';

function addGlobalMiddlewares(app: Express) {
  app.use(compression());
  app.use(bodyParser.json());
}

export async function initRestApi(app: Express) {
  addGlobalMiddlewares(app);

  new ApiRestActions(app, actionset).bind();

  return app;
}
