import { errorHandling } from '@team-app/shared-utils';
import { ApiContainer } from './container';

errorHandling.topLevel.register(process);

(async () => {
  const container = new ApiContainer();
  await container.prepare();
  await container.run();
})();
