export class ValidationException extends Error {
  constructor(errors: string[]) {
    super(`Validation error: ${errors.join(", ")}`);
    this.name = "ValidationException";
  }
}
