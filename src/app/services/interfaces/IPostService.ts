import { CreatePostDTO } from "@src/app/dtos/post/CreatePostDTO";
import { UpdatePostDTO } from "@src/app/dtos/post/UpdatePostDTO";
import { Post } from "@src/app/models/Post";

export interface IPostService {
  createPost(postData: CreatePostDTO): Promise<Post>;
  getPostById(postId: number): Promise<Post | null>;
  getAllPost(): Promise<Post[]>;
  getAllPostByUserId(userId: number): Promise<Post[]>;
  updatePost(postId: number, postData: UpdatePostDTO): Promise<Post | null>;
  deletePost(userId: number, postId: number): Promise<number>;
}
