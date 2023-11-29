import { Request, Response } from "express";

export interface IPostController {
  createPost(req: Request, res: Response): Promise<void>;
  getPostById(req: Request, res: Response): Promise<void>;
  getAllPosts(req: Request, res: Response): Promise<void>;
  getAllPostsByUserId(req: Request, res: Response): Promise<void>;
  updatePost(req: Request, res: Response): Promise<void>;
}
