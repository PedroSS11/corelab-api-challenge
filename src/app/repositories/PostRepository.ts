import { CreatePostDTO } from "../dtos/post/CreatePostDTO";
import { Post } from "../models/Post";
import { IPostRepository } from "./interfaces/IPostRepository";
import { User } from "../models/User";
import { WhereOptions } from "sequelize";
import { IPostAttributes } from "../models/interfaces/IPost";

export class PostRepository implements IPostRepository {
  async createPost(postData: CreatePostDTO): Promise<Post> {
    return await Post.create(postData.data);
  }

  async getPostById(postId: number): Promise<Post | null> {
    return await Post.findByPk(postId, {
      attributes: ["id", "title", "content", "color", "favorited", "userId"],
      include: [{ model: User, attributes: ["username"] }],
    });
  }

  async getAllPost(): Promise<Post[]> {
    return await Post.findAll({
      attributes: ["id", "title", "content", "color", "favorited", "userId"],
      include: [{ model: User, attributes: ["username"] }],
    });
  }

  async getAllPostByUserId(userId: number): Promise<Post[]> {
    return Post.findAll({
      where: { userId: userId },
      attributes: ["id", "title", "content", "color", "favorited", "userId"],
      include: [{ model: User, attributes: ["username"] }],
      order: [["favorited", "DESC"]],
    });
  }

  async updatePost(updatedCheckedPost: Post): Promise<Post | null> {
    return await updatedCheckedPost.save();
  }

  async deletePost(postId: number): Promise<number> {
    return await Post.destroy({
      where: { id: postId } as WhereOptions<IPostAttributes> | undefined,
    });
  }
}
