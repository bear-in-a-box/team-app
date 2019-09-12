import { RequestHandler } from 'express';

import { MessageBus } from '@team-app/ipc';

const messageBus = new MessageBus('test');

export const testIpcHandler: RequestHandler = async (req, res) => {
  const result = await messageBus.postAndWait<string, boolean>(
    { type: 'TestAction', data: 'asdf' }
  );
  res.json({ result });
}
