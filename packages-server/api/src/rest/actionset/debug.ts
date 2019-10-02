import { ApiRestAction } from '../actions';
import { testIpcHandler } from '../../test-ipc-handler';

export const debug: ApiRestAction[] = [
  new ApiRestAction({
    type: 'debug-healthcheck',
    route: '/',
    method: 'get',
    allowedInProduction: false,
    handler: (_req, res) => res.send('REST API is up and running.')
  }),
  new ApiRestAction({
    type: 'debug-ipc',
    route: '/test-ipc',
    method: 'get',
    allowedInProduction: false,
    handler: testIpcHandler
  }),
];
