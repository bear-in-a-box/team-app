import { Express } from 'express';
import bodyParser from 'body-parser';
import compression from 'compression';

import { env } from '@team-app/shared-utils';

import { testIpcHandler } from '../test-ipc-handler';
import { ApiRestActions } from './actions';
import { actionset } from './actionset';

function addDebugEndpointsHandlers(app: Express) {
  if (env.isProduction()) {
    return;
  }

  app.get(
    '/',
    (_req, res) => res.send('@team-app/api: REST API is up and running.')
  );

  app.get(
    '/test-ipc',
    testIpcHandler
  );
}

function addGlobalMiddlewares(app: Express) {
  app.use(compression());
  app.use(bodyParser.json());
}

export async function initRestApi(app: Express) {
  addGlobalMiddlewares(app);
  addDebugEndpointsHandlers(app);

  new ApiRestActions(app, actionset).bind();

  return app;
}
