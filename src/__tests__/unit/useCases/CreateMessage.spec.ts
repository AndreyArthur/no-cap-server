import { MessageAlreadyExistsError } from "@/exceptions";
import { CreateMessageUseCase } from "@/useCases";
import { MessagesRepositoryStub } from "@/__tests__/stubs/repositories";

const setup = () => {
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

    const message = await createMessage.execute('Test message.')

    expect(message.content).toBe('Test message.');
  });

  it('should fail because message was already created', async () => {
    const { createMessage } = setup();

    try {
      await createMessage.execute('Test message.')

      throw null;
    } catch (err) {
      expect(err instanceof MessageAlreadyExistsError).toBe(true);
    }
  })
});
