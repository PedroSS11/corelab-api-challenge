export interface IPostAttributes {
  title: string;
  content?: string | null;
  color?: string | null;
  favorited: boolean;
  userId: number;
}
