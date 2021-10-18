import { CreateMessageController } from '@/controllers';
import { MessagesRepositoryPostgres } from '@/infra/repositories';
import { CreateMessageUseCase } from '@/useCases';

export class CreateMessageControllerFactory {
  public static create(): CreateMessageController {
    const messagesRepository = new MessagesRepositoryPostgres();
    const createMessageUseCase = new CreateMessageUseCase(messagesRepository);
    const createMessageController = new CreateMessageController(
      createMessageUseCase,
    );

    return createMessageController;
  }
}
