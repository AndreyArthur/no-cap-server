import {
  InvalidMessageContentError,
  MessageAlreadyExistsError,
  MissingMessageContentError,
} from '@/exceptions';
import { HttpRequest, HttpResponse, Controller } from '@/protocols';
import { CreateMessage } from '@/useCases';

export class CreateMessageController implements Controller {
  private readonly createMessage: CreateMessage;

  constructor(createMessage: CreateMessage) {
    this.createMessage = createMessage;
  }

  public async handle(request: HttpRequest): Promise<HttpResponse> {
    const body = request.body as Record<string, unknown>;
    const content = typeof body.content === 'string'
      ? body.content.trim()
      : body.content;

    try {
      const message = await this.createMessage.execute(content as string);

      return {
        status: 201,
        body: {
          id: message.id,
          content: message.content,
          createdAt: message.createdAt.toISOString(),
        },
      };
    } catch (err) {
      if (err instanceof MissingMessageContentError
          || err instanceof InvalidMessageContentError) {
        return {
          status: 400,
          body: err,
        };
      }

      if (err instanceof MessageAlreadyExistsError) {
        return {
          status: 403,
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
