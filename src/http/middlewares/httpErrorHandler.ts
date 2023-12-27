export class HttpErrorHandler extends Error {
  statusCode: number;

  constructor(statusCode: number, message: string) {
    super(message);
    this.statusCode = statusCode;
    this.name = 'HttpErrorHandler';

    Error.captureStackTrace(this, this.constructor);
  }
}
