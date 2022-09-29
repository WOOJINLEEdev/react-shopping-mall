export class SentryError extends Error {
  private e: Error;
  constructor(e: Error) {
    super(e.message);

    this.e = e;

    Error.captureStackTrace(this, this.constructor);
  }
}
