import { Message } from "@/entities";
import { MessageAlreadyExistsError } from "@/exceptions";
import { InvalidMessageContentError } from "@/exceptions/InvalidMessageContent";
import { MessagesRepository } from "@/repositories";

export class CreateMessageUseCase {
  private readonly messagesRepository: MessagesRepository;

  constructor(messagesRepository: MessagesRepository) {
    this.messagesRepository = messagesRepository;
  }

  public async execute(content: string): Promise<Message> {
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
