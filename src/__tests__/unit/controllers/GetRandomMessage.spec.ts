import { GetRandomMessageController } from '@/controllers';
import {
  NoMessagesError,
} from '@/exceptions';
import { GetRandomMessage } from '@/useCases';
import { GetRandomMessageUseCase } from '@/__tests__/stubs/useCases';

type SetupComponents = {
  getRandomMessageController: GetRandomMessageController;
  getRandomMessage: GetRandomMessage;
};

const setup = (): SetupComponents => {
  const getRandomMessage = new GetRandomMessageUseCase();
  const getRandomMessageController = new GetRandomMessageController(
    getRandomMessage,
  );

  return {
    getRandomMessage,
    getRandomMessageController,
  };
};

describe('GetRandomMessage Controller', () => {
  it('should return 200 and random Message', async () => {
    const { getRandomMessageController } = setup();

    const { body, status } = await getRandomMessageController.handle({
      body: {},
    });

    expect(status).toBe(200);
    expect(typeof (body as Record<string, unknown>).content).toBe('string');
  });

  it('should return 409 status for NoMessagesError', async () => {
    const { getRandomMessageController, getRandomMessage } = setup();

    jest.spyOn(getRandomMessage, 'execute')
      .mockImplementationOnce(async () => {
        throw new NoMessagesError();
      });

    const { status } = await getRandomMessageController.handle({
      body: {},
    });

    expect(status).toBe(409);
  });

  it('should return 500 for unexpected errors', async () => {
    const { getRandomMessageController, getRandomMessage } = setup();

    jest.spyOn(getRandomMessage, 'execute')
      .mockImplementationOnce(async () => {
        throw new Error();
      });

    const { status } = await getRandomMessageController.handle({
      body: {},
    });

    expect(status).toBe(500);
  });
});
