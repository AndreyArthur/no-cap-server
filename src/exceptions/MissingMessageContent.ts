import { BaseError } from '@/exceptions/Base'

export class MissingMessageContentError extends BaseError {
  constructor() {
    super({
      type: 'validation',
      name: 'MissingMessageContentError',
      message: 'Field \'content\' is required.',
    })
  }
}

