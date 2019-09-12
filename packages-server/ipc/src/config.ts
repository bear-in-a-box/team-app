import { QueueOptions } from 'bull';

import { env } from '@team-app/shared-utils';

const { getters: {
  getEnvString,
  getEnvNumber
} } = env;

export const bullAwareConfig: Readonly<QueueOptions> = Object.freeze({
  redis: {
    port: getEnvNumber('IPC_REDIS_PORT'),
    host: getEnvString('IPC_REDIS_HOST'),
    // password: getEnvString('IPC_REDIS_PASS')
  }
});
