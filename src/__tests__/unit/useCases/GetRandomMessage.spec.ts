import { NoMessagesError } from '@/exceptions';
import { MessagesRepository } from '@/repositories';
import { GetRandomMessageUseCase } from '@/useCases';
import { MessagesRepositoryStub } from '@/__tests__/stubs/repositories';

type SetupComponents = {
  messagesRepository: MessagesRepository;
  getRandomMessage: GetRandomMessageUseCase;
};

const setup = (): SetupComponents => {
  const messagesRepository = new MessagesRepositoryStub();
  const getRandomMessage = new GetRandomMessageUseCase(messagesRepository);

  return {
    messagesRepository,
    getRandomMessage,
  };
};

describe('GetRandomMessage UseCase', () => {
  it('should get a message successfully', async () => {
    const { getRandomMessage } = setup();
    const message = await getRandomMessage.execute();

    expect(typeof message.id).toBe('number');
    expect(typeof message.content).toBe('string');
  });

  it('should fail because repository is returning no message', async () => {
    const { getRandomMessage, messagesRepository } = setup();

    jest.spyOn(messagesRepository, 'findRandom')
      .mockReturnValueOnce(Promise.resolve(null));

    try {
      await getRandomMessage.execute();

      throw null;
    } catch (err) {
      expect(err instanceof NoMessagesError).toBe(true);
    }
  });
});
