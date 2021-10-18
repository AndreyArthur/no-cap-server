import { BaseError } from '@/exceptions/Base';

export class InvalidMessageContentError extends BaseError {
  constructor() {
    super({
      type: 'validation',
      name: 'InvalidMessageContentError',
      message: 'Invalid message content, must be string and have 6-255 characters.',
    });
  }
}
