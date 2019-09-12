import Queue from 'bull';
import { bullAwareConfig } from '../config';
import { BaseMessageBus } from './base';
import { Task, MessageBus } from '../models';

class BullMessageBus extends BaseMessageBus {
  private readonly queue: Queue.Queue;
  
  constructor(channelName: string) {
    super(channelName);
    this.queue = new Queue(channelName, bullAwareConfig);
  }

  defineHandler<TaskType>(handler) {
    this.handler = handler;
    this.queue.process(
      job => this.handler(job.data as Task<TaskType>)
    );
  }

  post<Data>(task: Task<Data>): void {
    this.queue.add(
      task,
      {
        removeOnComplete: true,
        removeOnFail: true
      }
    );
  }

  async postAndWait<Data, Returns>(task: Task<Data>): Promise<Returns> {
    console.log('postAndWait');
    const job = await this.queue.add(
      task,
      {
        removeOnComplete: false,
        removeOnFail: true
      }
    );
    console.log('waiting for finish');
    await job.finished();
    console.log('finished');
    const { returnvalue } = await this.queue.getJob(job.id);
    console.log('got result', returnvalue);
    job.remove();
    console.log('requested removal');
    return returnvalue as Returns;
  }
}

const def: MessageBus = BullMessageBus;
export { def as BullMessageBus };
