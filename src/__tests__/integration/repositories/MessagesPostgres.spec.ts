import { database } from "@/infra/database";
import { MessagesRepositoryPostgres } from "@/infra/repositories";

describe('MessagesPostgres Repository', () => {
  beforeAll(async () => { await database.migrate(); });
  beforeEach(async () => {
    await database.query('DELETE FROM messages;');
  });
  afterAll(() => { database.close(); });

  it('should save message in database', async () => {
    const messagesRepository = new MessagesRepositoryPostgres();
    const savedMessage = await messagesRepository.save('Message content.');
    const message = await database.oneOrNone<Record<string, unknown>>(
      `SELECT * FROM messages WHERE id = '${savedMessage.id}';`,
    );

    expect(message?.content).toBe(savedMessage.content);
    expect(!!message).toBe(true);
  });

  it('should find a message in database by content', async () => {
    const messagesRepository = new MessagesRepositoryPostgres();
    const content = 'Message content.';

    await database
      .query(`INSERT INTO messages (content) VALUES ('${content}')`);

    const message = await messagesRepository.findByContent(content);

    expect(message?.content).toBe(content);
    expect(!!message).toBe(true);
  });
});
