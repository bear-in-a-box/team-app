import { createConnection, Connection } from 'typeorm';
import ormConfig from '../ormconfig';

let connection: Connection = null;

export async function getOrmConnection() {
  return connection != null
    ? connection
    : (connection = await createConnection(ormConfig))
}
