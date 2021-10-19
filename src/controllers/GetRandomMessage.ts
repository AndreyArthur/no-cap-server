import { NoMessagesError } from '@/exceptions';
import { Controller, HttpRequest, HttpResponse } from '@/protocols';
import { GetRandomMessage } from '@/useCases';

export class GetRandomMessageController implements Controller {
  private readonly getRandomMessage: GetRandomMessage;

  constructor(getRandomMessage: GetRandomMessage) {
    this.getRandomMessage = getRandomMessage;
  }

  public async handle(_request: HttpRequest): Promise<HttpResponse> {
    try {
      const message = await this.getRandomMessage.execute();

      return {
        status: 200,
        body: {
          id: message.id,
          content: message.content,
          createdAt: message.createdAt.toISOString(),
        },
      };
    } catch (err) {
      if (err instanceof NoMessagesError) {
        return {
          status: 409,
          body: err,
        };
      }

      return {
        status: 500,
        body: {
          type: 'unexpected',
          name: 'InternalServerError',
          message: 'An internal server error has occured, try again later.',
        },
      };
    }
  }
}
