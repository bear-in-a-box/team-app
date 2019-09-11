import { ConnectionOptions } from 'typeorm';
import { env } from '@team-app/shared-utils';

const { getters: {
  getEnvNumber,
  getEnvString
} } = env;

const config: ConnectionOptions = {
  type: 'postgres',
  host: getEnvString('TYPEORM_HOST'),
  port: getEnvNumber('TYPEORM_PORT'),
  username: getEnvString('TYPEORM_USERNAME'),
  password: getEnvString('TYPEORM_PASSWORD'),
  database: getEnvString('TYPEORM_DATABASE'),
  logging: false,
  migrationsRun: true,
  entities: [
    __dirname + '/entity/*{.js,.ts}'
  ],
  migrations: [
    __dirname + '/migration/**/*{.js,.ts}'
  ],
  subscribers: [
    __dirname + '/subscriber/**/*.ts'
  ]
}

export default config;
