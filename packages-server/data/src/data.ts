import 'reflect-metadata';
import { errorHandling } from '@team-app/shared-utils';
import { connection } from './bridge';

errorHandling.topLevel.register(process);

(async function init() {
  const _connection = await connection.getConnection();
  const status = _connection != null ? 'OK' : 'FAIL';
  console.log('Data bridge connection status: ' + status);
})();
