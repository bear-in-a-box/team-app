import { Express } from 'express';
import { env } from '@team-app/shared-utils';
import { testIpcHandler } from '../test-ipc-handler';
import { ApiRestActions } from './actions';
import { actionset } from './actionset';

function addDebugEndpointsHandlers(app: Express) {
  app.get(
    '/',
    (_req, res) => res.send('@team-app/api: REST API is up and running.')
  );

  app.get(
    '/test-ipc',
    testIpcHandler
  );
}

export async function initRestApi(app: Express) {
  if (!env.isProduction()) {
    addDebugEndpointsHandlers(app);
  }

  new ApiRestActions(app, actionset).bind();

  return app;
}
