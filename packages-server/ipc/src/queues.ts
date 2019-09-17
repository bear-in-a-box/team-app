import { MessageBusInterface, MessageHandler } from './models';
import { MessageBus } from './ipc';

export enum BusType {
  Custom = 'custom',
  ClientErrors = 'client-errors',
  Notifications = 'notifications',
  Data = 'data',
  Api = 'api',
  Test = 'test',
}

type CustomBusFactoryOptions = {
  type: BusType.Custom;
  customChannelName: string;
}
type PredefinedBusFactoryOptions = { type: Exclude<BusType, BusType.Custom>; }
type BusFactoryCommonOptions = { handler?: MessageHandler; };
export type BusFactoryOptions =
  BusFactoryCommonOptions &
  (
    CustomBusFactoryOptions |
    PredefinedBusFactoryOptions
  );

function isBusCustom(options: BusFactoryOptions): options is CustomBusFactoryOptions {
  return options !== null && options.type === BusType.Custom;
}
function isBusPredefined(options: BusFactoryOptions): options is PredefinedBusFactoryOptions {
  return options !== null && options.type !== BusType.Custom;
}

function createBus(
  channelName: string,
  handler?: MessageHandler
): MessageBusInterface {
  const messageBusInterface = new MessageBus(channelName);
  if (handler !== null) {
    messageBusInterface.defineHandler(handler);
  }
  return messageBusInterface;
}

export function connectToBus(options: BusFactoryOptions): MessageBusInterface {
  const { handler } = options;
  if (isBusCustom(options)) {
    const { customChannelName } = options;
    return createBus(customChannelName, handler);
  } else if (isBusPredefined(options)) {
    const { type } = options;
    return createBus(type, handler);
  }
}
