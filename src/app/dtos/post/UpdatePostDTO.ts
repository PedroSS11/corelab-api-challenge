interface IUpdatePost {
  title?: string;
  content?: string;
  color?: string;
  favorited?: boolean;
  userId: number;
}

export class UpdatePostDTO {
  constructor(public readonly userId: number, public data: IUpdatePost) {}

  validate(): string[] {
    const errors: string[] = [];

    if (!this.data.title || this.data.title.trim().length === 0) {
      errors.push("Title is required.");
    }

    return errors;
  }
}
