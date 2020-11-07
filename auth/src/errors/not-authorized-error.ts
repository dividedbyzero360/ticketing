import { CustomError } from './custom-error';

export class NotAuthorizedError extends CustomError {
  statusCode: number;

  constructor() {
    super('');
    this.statusCode = 401;
    Object.setPrototypeOf(this, NotAuthorizedError.prototype);
  }
  serializeErrors() {
    return [{ message: 'Not authorized' }];
  }
}
