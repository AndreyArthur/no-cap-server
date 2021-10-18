import { Message } from '@/entities';
import { NoMessagesError } from '@/exceptions';
import { MessagesRepository } from '@/repositories';
import { GetRandomMessage } from '@/useCases';

export class GetRandomMessageUseCase implements GetRandomMessage {
  private readonly messagesRepository: MessagesRepository;

  constructor(messagesRepository: MessagesRepository) {
    this.messagesRepository = messagesRepository;
  }

  public async execute(): Promise<Message> {
    const message = await this.messagesRepository.findRandom();

    if (!message) throw new NoMessagesError();

    return message;
  }
}
