import { CreatePostDTO } from "@src/app/dtos/post/CreatePostDTO";
import { Post } from "@src/app/models/Post";

export interface IPostRepository {
  createPost(postData: CreatePostDTO): Promise<Post>;
  getPostById(postId: number): Promise<Post | null>;
  getAllPost(): Promise<Post[]>;
  getAllPostByUserId(userId: number): Promise<Post[]>;
  updatePost(updatedCheckedPost: Post): Promise<Post | null>;
  deletePost(postId: number): Promise<number>
}
