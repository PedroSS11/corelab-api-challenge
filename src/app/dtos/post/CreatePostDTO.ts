interface ICreatePost {
  title: string;
  content?: string | null;
  color?: string | null;
  favorited: boolean;
  userId: number;
}

export class CreatePostDTO {
  constructor(public data: ICreatePost) {}

  validate(): string[] {
    const errors: string[] = [];

    if (!this.data.title || this.data.title.trim().length === 0) {
      errors.push("Title is required.");
    }

    return errors;
  }
}
