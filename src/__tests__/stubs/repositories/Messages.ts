import { Message } from '@/entities';
import { MessagesRepository } from '@/repositories';

export class MessagesRepositoryStub implements MessagesRepository {
  public async save(content: string): Promise<Message> {
    return Promise.resolve({
      id: 1,
      content,
      createdAt: new Date(),
    });
  }

  public async findByContent(content: string): Promise<Message | null> {
    return Promise.resolve({
      id: 1,
      content,
      createdAt: new Date(),
    });
  }

  public async findRandom(): Promise<Message | null> {
    return Promise.resolve({
      id: 1,
      content: 'content',
      createdAt: new Date(),
    });
  }
}
