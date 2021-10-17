type MessageConstructor = {
  id: number;
  content: string;
  createdAt?: Date;
}

export class Message {
  public readonly id: number;

  public readonly content: string;

  public readonly createdAt: Date;

  constructor({ id, content, createdAt }: MessageConstructor) {
    this.id = id;
    this.content = content;
    this.createdAt = createdAt || new Date();
  }
}
