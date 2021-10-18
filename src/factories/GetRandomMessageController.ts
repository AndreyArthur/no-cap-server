import { GetRandomMessageController } from '@/controllers';
import { MessagesRepositoryPostgres } from '@/infra/repositories';
import { GetRandomMessageUseCase } from '@/useCases';

export class GetRandomMessageControllerFactory {
  public static create(): GetRandomMessageController {
    const messagesRepository = new MessagesRepositoryPostgres();
    const getRandomMessageUseCase = new GetRandomMessageUseCase(
      messagesRepository,
    );
    const getRandomMessageController = new GetRandomMessageController(
      getRandomMessageUseCase,
    );

    return getRandomMessageController;
  }
}
