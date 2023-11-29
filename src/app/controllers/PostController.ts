import { inject, injectable } from "tsyringe";
import { PostService } from "../services/PostService";
import { Request, Response } from "express";
import { Controller, Delete, Get, Post, Put } from "@overnightjs/core";
import { CreatePostDTO } from "../dtos/post/CreatePostDTO";
import { ValidationException } from "../exception/ValidationException";
import { IPostController } from "./interface/IPostController";
import { UpdatePostDTO } from "../dtos/post/UpdatePostDTO";

@injectable()
@Controller("api/post")
export class PostController implements IPostController {
  constructor(@inject("PostService") private postService: PostService) {}

  @Post("")
  async createPost(req: Request, res: Response): Promise<void> {
    const postData = req.body;
    const createPostDTO = new CreatePostDTO(postData);

    try {
      const post = await this.postService.createPost(createPostDTO);
      res.status(201).json(post);
    } catch (error: any) {
      if (error instanceof ValidationException) {
        res.status(400).json({ error: error.message });
      } else {
        res
          .status(500)
          .json({ error: "Internal Server Error", message: error.message });
      }
    }
  }

  @Get("")
  async getAllPosts(_: Request, res: Response): Promise<void> {
    try {
      const posts = await this.postService.getAllPost();
      res.status(200).json(posts);
    } catch (error: any) {
      res
        .status(500)
        .json({ error: "Internal Server Error", message: error.message });
    }
  }

  @Get(":id")
  async getPostById(req: Request, res: Response): Promise<void> {
    const { id } = req.params;
    try {
      const post = await this.postService.getPostById(parseInt(id));
      res.status(200).json(post);
    } catch (error: any) {
      res
        .status(500)
        .json({ error: "Internal Server Error", message: error.message });
    }
  }

  @Get("user/:id")
  async getAllPostsByUserId(req: Request, res: Response): Promise<void> {
    const { id } = req.params;
    try {
      const postsByUser = await this.postService.getAllPostByUserId(
        parseInt(id)
      );
      res.status(200).json(postsByUser);
    } catch (error: any) {
      res
        .status(500)
        .json({ error: "Internal Server Error", message: error.message });
    }
  }

  @Put(":id")
  async updatePost(req: Request, res: Response): Promise<void> {
    const { id } = req.params;
    const postData = req.body;
    try {
      const updatedPostData = new UpdatePostDTO(parseInt(id), postData);
      const updatedPost = await this.postService.updatePost(
        parseInt(id),
        updatedPostData
      );
      res.status(200).json(updatedPost);
    } catch (error: any) {
      res
        .status(500)
        .json({ error: "Internal Server Error", message: error.message });
    }
  }

  @Delete("delete/:postId/:userId")
  async deletePost(req: Request, res: Response): Promise<void> {
    const { postId, userId } = req.params;

    try {
      await this.postService.deletePost(parseInt(userId), parseInt(postId));
      res.status(204).json();
    } catch (error: any) {
      res
        .status(500)
        .json({ error: "Internal Server Error", message: error.message });
    }
  }
}
