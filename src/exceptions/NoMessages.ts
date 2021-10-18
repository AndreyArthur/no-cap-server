import { BaseError } from '@/exceptions/Base';

export class NoMessagesError extends BaseError {
  constructor() {
    super({
      type: 'conflict',
      name: 'NoMessagesError',
      message: 'Database has no messages yet, be the first to create one.',
    });
  }
}
