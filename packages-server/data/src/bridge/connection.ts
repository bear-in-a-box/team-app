import { createConnection, Connection } from 'typeorm';
import { design } from '@team-app/shared-utils';
import ormConfig from '../ormconfig';

const ormConnection = new design.Lazy<Connection>(() => createConnection(ormConfig));

export function getOrmConnection() {
  return ormConnection.getInstance();
}
