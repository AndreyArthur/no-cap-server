import {
  MessageAlreadyExistsError,
  MissingMessageContentError,
  InvalidMessageContentError,
} from '@/exceptions';
import { MessagesRepository } from '@/repositories';
import { CreateMessageUseCase } from '@/useCases';
import { MessagesRepositoryStub } from '@/__tests__/stubs/repositories';

type SetupComponents = {
  messagesRepository: MessagesRepository;
  createMessage: CreateMessageUseCase;
};

const setup = (): SetupComponents => {
  const messagesRepository = new MessagesRepositoryStub();
  const createMessage = new CreateMessageUseCase(messagesRepository);

  return {
    messagesRepository,
    createMessage,
  };
};

describe('CreateMessage UseCase', () => {
  it('should create a message successfully', async () => {
    const { createMessage, messagesRepository } = setup();

    jest.spyOn(messagesRepository, 'findByContent')
      .mockReturnValueOnce(Promise.resolve(null));

    const message = await createMessage.execute('Test message.');

    expect(message.content).toBe('Test message.');
  });

  it('should fail because message was already created', async () => {
    const { createMessage } = setup();

    try {
      await createMessage.execute('Test message.');

      throw null;
    } catch (err) {
      expect(err instanceof MessageAlreadyExistsError).toBe(true);
    }
  });

  it('should fail because message content is missing', async () => {
    const { createMessage } = setup();

    try {
      await createMessage.execute('');

      throw null;
    } catch (err) {
      expect(err instanceof MissingMessageContentError).toBe(true);
    }
  });

  it('should fail because message content is invalid', async () => {
    const { createMessage } = setup();

    try {
      await createMessage.execute('Hello');

      throw null;
    } catch (err) {
      expect(err instanceof InvalidMessageContentError).toBe(true);
    }

    try {
      await createMessage.execute(((): string => {
        let text = '';

        for (let i = 0; i < 256; i += 1) {
          text += 'a';
        }

        return text;
      })());

      throw null;
    } catch (err) {
      expect(err instanceof InvalidMessageContentError).toBe(true);
    }

    try {
      await createMessage.execute(true as unknown as string);

      throw null;
    } catch (err) {
      expect(err instanceof InvalidMessageContentError).toBe(true);
    }
  });
});
