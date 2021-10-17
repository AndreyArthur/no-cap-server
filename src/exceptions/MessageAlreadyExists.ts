import { BaseError } from '@/exceptions/Base'

export class MessageAlreadyExistsError extends BaseError {
  constructor() {
    super({
      type: 'conflict',
      name: 'MessageAlreadyExistsError',
      message: 'The same message has already sent, be more creative!',
    })
  }
}
