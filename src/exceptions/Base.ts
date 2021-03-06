export class BaseError {
  public readonly type: 'conflict' | 'validation';

  public readonly name: string;

  public readonly message: string;

  constructor({ type, name, message }: BaseError) {
    this.type = type;
    this.name = name;
    this.message = message;
  }
}
