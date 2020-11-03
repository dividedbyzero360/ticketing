import { CustomError } from './custom-error';
export class DatabaseConnectionError extends CustomError {
  reason: string = 'Error connecting to database';
  statusCode: number;
  constructor() {
    super('Error connecting to db');
    this.statusCode = 500;
    Object.setPrototypeOf(this, DatabaseConnectionError.prototype);
  }

  serializeErrors() {
    return [
      {
        message: this.reason,
      },
    ];
  }
}
