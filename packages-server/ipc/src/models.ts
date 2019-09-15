export interface Task<T> {
  type: string;
  data: T;
}

export type MessageHandler<T = any, U = any> = (task: Task<T>) => Promise<U>;

export interface MessageBusInterface {
  post<Data>(task: Task<Data>): void;
  postAndWait<Data, Returns>(task: Task<Data>): Promise<Returns>;
  defineHandler<TaskType, Returns>(handler: MessageHandler<TaskType, Returns>): void;
}

export type MessageBus = new (channelName: string) => MessageBusInterface;
