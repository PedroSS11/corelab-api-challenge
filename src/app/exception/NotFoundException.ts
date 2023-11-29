export class NotFoundException extends Error {
  constructor(entity: string) {
    super(`${entity} not found.`);
    this.name = "ValidationException";
  }
}
