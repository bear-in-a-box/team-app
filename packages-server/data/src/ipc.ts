import { connectToBus, BusType, BusFactoryOptions, MessageHandler } from '@team-app/ipc';

export function fireQueue() {
  const handler: MessageHandler<string, boolean> = (({ type, data }) => {
    console.log(`Data module: got a task of type ${type} and the following data:`, data);
    return Promise.resolve(true);
  });
  const options: BusFactoryOptions = {
    type: BusType.Test,
    handler
  };
  connectToBus(options);
}
