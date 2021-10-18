import request from 'supertest';

import { database } from '@/infra/database';
import { app } from '@/infra/http';

describe('/messages/ POST endpoint', () => {
  beforeAll(async () => { await database.migrate(); });
  beforeEach(async () => {
    await database.query('DELETE FROM messages;');
  });
  afterAll(() => { database.close(); });

  const url = '/messages/';

  it('should create a message successfully', async () => {
    const content = 'Message content.';
    const { body, status } = await request(app).post(url).send({
      content,
    });

    expect(body.content).toBe(content);
    expect(status).toBe(201);
  });

  it('should fail because message content is missing', async () => {
    const { body, status } = await request(app).post(url).send({
      content: '',
    });

    expect(status).toBe(400);
    expect(body.name).toBe('MissingMessageContentError');
  });

  it('should fail because message content is invalid', async () => {
    const { body, status } = await request(app).post(url).send({
      content: 'Hello',
    });

    expect(status).toBe(400);
    expect(body.name).toBe('InvalidMessageContentError');
  });

  it('should fail because message has been already created', async () => {
    const content = 'Message content.';

    await database.query(
      `INSERT INTO messages (content) VALUES ('${content}')`,
    );

    const { body, status } = await request(app).post(url).send({
      content,
    });

    expect(status).toBe(403);
    expect(body.name).toBe('MessageAlreadyExistsError');
  });
});
