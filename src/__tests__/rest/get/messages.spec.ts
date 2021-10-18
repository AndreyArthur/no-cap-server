import request from 'supertest';

import { database } from '@/infra/database';
import { app } from '@/infra/http';

describe('/messages/ GET endpoint', () => {
  beforeAll(async () => { await database.migrate(); });
  beforeEach(async () => {
    await database.query('DELETE FROM messages;');
  });
  afterAll(() => { database.close(); });

  const url = '/messages/';

  it('should get message successfully', async () => {
    await database.query(
      'INSERT INTO messages (content) VALUES (\'a\'), (\'b\'), (\'c\');',
    );

    const { body, status } = await request(app).get(url);

    expect(['a', 'b', 'c'].includes(body.content)).toBe(true);
    expect(status).toBe(200);
  });

  it('should fail because database has no messages', async () => {
    const { body, status } = await request(app).get(url);

    expect(status).toBe(409);
    expect(body.name).toBe('NoMessagesError');
  });
});
