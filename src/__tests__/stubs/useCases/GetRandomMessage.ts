import { Message } from '@/entities';
import { GetRandomMessage } from '@/useCases';

export class GetRandomMessageUseCaseStub implements GetRandomMessage {
  public async execute(): Promise<Message> {
    return Promise.resolve(new Message({
      id: 1,
      content: 'content',
      createdAt: new Date(),
    }));
  }
}
