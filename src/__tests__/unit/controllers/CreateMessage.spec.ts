import { CreateMessageController } from '@/controllers';
import { InvalidMessageContentError, MessageAlreadyExistsError, MissingMessageContentError } from '@/exceptions';
import { CreateMessage } from '@/useCases';
import { CreateMessageUseCaseStub } from '@/__tests__/stubs/useCases';

type SetupComponents = {
  createMessageController: CreateMessageController;
  createMessage: CreateMessage;
};

const setup = (): SetupComponents => {
  const createMessage = new CreateMessageUseCaseStub();
  const createMessageController = new CreateMessageController(createMessage);

  return {
    createMessage,
    createMessageController,
  };
};

describe('CreateMessage Controller', () => {
  it('should return 201 and created Message', async () => {
    const { createMessageController } = setup();

    const { body, status } = await createMessageController.handle({
      body: {
        content: 'Message content.',
      },
    });

    expect(status).toBe(201);
    expect(typeof (body as Record<string, unknown>).content).toBe('string');
  });

  it('should return 400 status for validation errors', async () => {
    const { createMessageController, createMessage } = setup();

    jest.spyOn(createMessage, 'execute')
      .mockImplementationOnce(async (_: string) => {
        throw new MissingMessageContentError();
      });

    {
      const { status } = await createMessageController.handle({
        body: {
          content: 'Message content.',
        },
      });

      expect(status).toBe(400);
    }

    jest.spyOn(createMessage, 'execute')
      .mockImplementationOnce(async (_: string) => {
        throw new InvalidMessageContentError();
      });

    {
      const { status } = await createMessageController.handle({
        body: {
          content: 'Message content.',
        },
      });

      expect(status).toBe(400);
    }
  });

  it('should return 403 status for conflict errors', async () => {
    const { createMessageController, createMessage } = setup();

    jest.spyOn(createMessage, 'execute')
      .mockImplementationOnce(async (_: string) => {
        throw new MessageAlreadyExistsError();
      });

    const { status } = await createMessageController.handle({
      body: {
        content: 'Message content.',
      },
    });

    expect(status).toBe(403);
  });

  it('should return 500 for unexpected errors', async () => {
    const { createMessageController, createMessage } = setup();

    jest.spyOn(createMessage, 'execute')
      .mockImplementationOnce(async (_: string) => {
        throw new Error();
      });

    const { status } = await createMessageController.handle({
      body: {
        content: 'Message content.',
      },
    });

    expect(status).toBe(500);
  });
});
