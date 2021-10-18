import { Message } from '@/entities';
import { MessagesRepository } from '@/repositories';
import { database } from '@/infra/database';

type MessageData = {
  id: number;
  content: string;
  created_at: Date;
};

export class MessagesRepositoryPostgres implements MessagesRepository {
  public async save(content: string): Promise<Message> {
    const messageData = await database.oneOrNone<MessageData>(
      'INSERT INTO messages (content) VALUES (?) RETURNING *;',
      [
        content,
      ],
    );

    if (!messageData) throw new Error('Query failed.');

    return new Message({
      id: messageData.id,
      content: messageData.content,
      createdAt: messageData.created_at,
    });
  }

  public async findByContent(content: string): Promise<Message | null> {
    const messageData = await database.oneOrNone<MessageData>(
      'SELECT * FROM messages WHERE content = ?;',
      [
        content,
      ],
    );

    if (!messageData) return null;

    return new Message({
      id: messageData.id,
      content: messageData.content,
      createdAt: messageData.created_at,
    });
  }

  public async findRandom(): Promise<Message | null> {
    const messageData = await database.oneOrNone<MessageData>(
      'SELECT * FROM messages ORDER BY RANDOM() LIMIT 1;',
    );

    if (!messageData) return null;

    return new Message({
      id: messageData.id,
      content: messageData.content,
      createdAt: messageData.created_at,
    });
  }
}
