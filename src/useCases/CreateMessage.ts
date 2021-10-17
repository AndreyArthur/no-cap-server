import { Message } from "@/entities";
import {
  MessageAlreadyExistsError,
  MissingMessageContentError,
  InvalidMessageContentError
} from "@/exceptions";
import { MessagesRepository } from "@/repositories";

export class CreateMessageUseCase {
  private readonly messagesRepository: MessagesRepository;

  constructor(messagesRepository: MessagesRepository) {
    this.messagesRepository = messagesRepository;
  }

  public async execute(content: string): Promise<Message> {
    if (!content) throw new MissingMessageContentError();

    if (typeof content !== 'string'
      || content.length < 6
      || content.length > 255) {
      throw new InvalidMessageContentError();
    }

    const messageExists = await this.messagesRepository.findByContent(content);

    if (messageExists) throw new MessageAlreadyExistsError();

    const message = await this.messagesRepository.save(content);

    return message;
  }
}
