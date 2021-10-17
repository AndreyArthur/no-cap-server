export class MessageAlreadyExistsError {
  public readonly type: 'conflict';

  public readonly name: string;

  public readonly message: string;

  constructor() {
    this.type = 'conflict';
    this.name = 'MessageAlreadyExistsError';
    this.message = 'The same message has already sent, be more creative!'
  }
}
