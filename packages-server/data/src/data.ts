import 'reflect-metadata';
import { errorHandling } from '@team-app/shared-utils';
import { connection } from './bridge';
import { fireQueue } from './ipc';

errorHandling.topLevel.register(process);

(async function init() {
  const _connection = await connection.getOrmConnection();
  const status = _connection != null ? 'OK' : 'FAIL';
  console.log('Data bridge connection status: ' + status);

  fireQueue();
})();
