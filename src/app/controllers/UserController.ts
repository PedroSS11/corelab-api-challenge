import { Request, Response } from "express";
import { UserService } from "../services/UserService";
import { CreateUserDTO } from "../dtos/user/CreateUserDTO";
import { ValidationException } from "../exception/ValidationException";
import { inject, injectable } from "tsyringe";
import { Controller, Get, Post, Put } from "@overnightjs/core";
import { IUserController } from "./interface/IUserController";
import { UpdateUserDTO } from "../dtos/user/UpdateUserDTO";

@injectable()
@Controller("api/user")
export class UserController implements IUserController {
  constructor(@inject("UserService") private userService: UserService) {}

  @Post("")
  async createUser(req: Request, res: Response): Promise<void> {
    const userData = req.body;
    const createUserDTO = new CreateUserDTO(userData);

    try {
      const user = await this.userService.createUser(createUserDTO);
      res.status(201).json(user);
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
  async getAllUsers(_: Request, res: Response): Promise<void> {
    try {
      const users = await this.userService.getAllUsers();
      res.status(200).json(users);
    } catch (error: any) {
      res
        .status(500)
        .json({ error: "Internal Server Error", message: error.message });
    }
  }

  @Get(":id")
  async getUserById(req: Request, res: Response): Promise<void> {
    const { id } = req.params;
    try {
      const user = await this.userService.getUserById(parseInt(id));
      res.status(200).json(user);
    } catch (error: any) {
      res
        .status(500)
        .json({ error: "Internal Server Error", message: error.message });
    }
  }

  @Put(":id")
  async updateUser(req: Request, res: Response): Promise<void> {
    const { id } = req.params;
    const userData = req.body;
    try {
      const updatedData = new UpdateUserDTO(userData);
      const updatedUser = await this.userService.updateUser(
        parseInt(id),
        updatedData
      );
      res.status(200).json(updatedUser);
    } catch (error: any) {
      res
        .status(500)
        .json({ error: "Internal Server Error", message: error.message });
    }
  }
}
