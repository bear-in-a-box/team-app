import { MessageBus } from '@team-app/ipc';

export function fireQueue() {
  const messageBus = new MessageBus('test');
  
  messageBus.defineHandler<string, boolean>(task => {
    console.log('Data module: got a task!', task);
    return Promise.resolve(true);
  });
}
