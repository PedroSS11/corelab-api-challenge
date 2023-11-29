interface IUpdateUser {
  username: string;
}

export class UpdateUserDTO {
  constructor(public data: IUpdateUser) {}

  validate(): string[] {
    const errors: string[] = [];

    if (!this.data.username || this.data.username.trim().length === 0) {
      errors.push("Username is required.");
    }

    return errors;
  }
}
