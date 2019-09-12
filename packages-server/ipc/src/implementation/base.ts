import { MessageHandler, MessageBusInterface } from '../models';

export abstract class BaseMessageBus implements MessageBusInterface {
  protected handler: MessageHandler = null;

  constructor(
    protected channelName: string
  ) { }

  defineHandler(handler) {
    if (this.handler != null) {
      throw new Error('Handler already defined.');
    }
    this.handler = handler;
  }

  public abstract post(task);
  public abstract postAndWait(task);
}
