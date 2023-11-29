interface ICreateUser {
  username: string;
}

export class CreateUserDTO {
  constructor(public data: ICreateUser) {}

  validate(): string[] {
    const errors: string[] = [];

    if (!this.data.username || this.data.username.trim().length === 0) {
      errors.push("Username is required.");
    }

    return errors;
  }
}
