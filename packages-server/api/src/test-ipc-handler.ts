import { RequestHandler } from 'express';

import { connectToBus, BusType } from '@team-app/ipc';

const messageBus = connectToBus({ type: BusType.Test });

export const testIpcHandler: RequestHandler = async (_req, res) => {
  const result = await messageBus.postAndWait<string, boolean>(
    { type: 'TestAction', data: 'asdf' }
  );
  res.json({ result });
}
