import { Message } from '@/entities';

export interface MessagesRepository {
  save: (content: string) => Promise<Message>;
  findByContent: (content: string) => Promise<Message | null>;
  findRandom: () => Promise<Message | null>;
}
