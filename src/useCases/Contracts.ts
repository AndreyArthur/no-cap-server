import { Message } from '@/entities';

export interface CreateMessage {
  execute: (content: string) => Promise<Message>;
}
