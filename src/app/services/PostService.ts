import { inject, injectable } from "tsyringe";
import { PostRepository } from "../repositories/PostRepository";
import { IPostService } from "./interfaces/IPostService";
import { CreatePostDTO } from "../dtos/post/CreatePostDTO";
import { UpdatePostDTO } from "../dtos/post/UpdatePostDTO";
import { Post } from "../models/Post";
import { ValidationException } from "../exception/ValidationException";
import { UserService } from "./UserService";
import { NotFoundException } from "../exception/NotFoundException";

@injectable()
export class PostService implements IPostService {
  constructor(
    @inject("PostRepository")
    @inject("UserService")
    private postRepository: PostRepository,
    private userService: UserService
  ) {}

  async createPost(createPostDTO: CreatePostDTO): Promise<Post> {
    const validationErrors = createPostDTO.validate();
    if (validationErrors.length > 0) {
      throw new ValidationException(validationErrors);
    }

    const existingUser = await this.userService.getUserById(
      createPostDTO.data.userId
    );
    if (!existingUser) throw new NotFoundException("User");
    return await this.postRepository.createPost(createPostDTO);
  }

  async getPostById(postId: number): Promise<Post | null> {
    return await this.postRepository.getPostById(postId);
  }

  async getAllPost(): Promise<Post[]> {
    return await this.postRepository.getAllPost();
  }

  async getAllPostByUserId(userId: number): Promise<Post[]> {
    return await this.postRepository.getAllPostByUserId(userId);
  }

  async updatePost(
    postId: number,
    postData: UpdatePostDTO
  ): Promise<Post | null> {
    const checkPost = await this.postRepository.getPostById(postId);
    if (!checkPost) throw new NotFoundException("Post");

    // check if the user exists, and if he is the owner of the post
    await this.checkPostOwner(postId, postData.data.userId);

    checkPost.title = postData.data.title || checkPost.title;
    checkPost.content = postData.data.content || checkPost.content;
    if (postData.data.favorited !== undefined)
      checkPost.favorited = postData.data.favorited;

    return await this.postRepository.updatePost(checkPost);
  }

  async deletePost(userId: number, postId: number): Promise<number> {
    await this.checkPostOwner(postId, userId);
    return await this.postRepository.deletePost(postId);
  }

  // -- HELPER --

  private async checkPostOwner(postId: number, userId: number): Promise<void> {
    const checkPost = await this.postRepository.getPostById(postId);
    if (!checkPost) throw new NotFoundException("Post");

    const checkUser = await this.userService.getUserById(userId);
    if (!checkUser) throw new NotFoundException("User");
    if (checkPost.userId !== userId) {
      throw new Error("Posts can only be modified by their owners");
    }
  }
}
