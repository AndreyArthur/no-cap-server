import { Message } from '@/entities';
import { CreateMessage } from '@/useCases';

export class CreateMessageUseCaseStub implements CreateMessage {
  public async execute(content: string): Promise<Message> {
    return new Message({
      id: 1,
      content,
      createdAt: new Date(),
    });
  }
}
