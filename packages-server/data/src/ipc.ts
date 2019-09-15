import { MessageBus } from '@team-app/ipc';

export function fireQueue() {
  const messageBus = new MessageBus('test');
  
  messageBus.defineHandler<string, boolean>(({ type, data }) => {
    console.log(`Data module: got a task of type ${type} and the following data:`, data);
    return Promise.resolve(true);
  });
}
