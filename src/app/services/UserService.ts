import { User } from "../models/User";
import { CreateUserDTO } from "../dtos/user/CreateUserDTO";
import { UserRepository } from "../repositories/UserRepository";
import { IUserService } from "./interfaces/IUserService";
import { ValidationException } from "../exception/ValidationException";
import { injectable, inject } from "tsyringe";
import { UpdateUserDTO } from "../dtos/user/UpdateUserDTO";
import { NotFoundException } from "../exception/NotFoundException";

@injectable()
export class UserService implements IUserService {
  constructor(
    @inject("UserRepository") private userRepository: UserRepository
  ) {}

  async createUser(createUserDTO: CreateUserDTO): Promise<User> {
    const validationErrors = createUserDTO.validate();
    if (validationErrors.length > 0) {
      throw new ValidationException(validationErrors);
    }

    const { username } = createUserDTO.data;
    return await this.userRepository.createUser(username);
  }

  async getUserById(userId: number): Promise<User | null> {
    const user = await this.userRepository.getUserById(userId);
    if (user === null) throw new NotFoundException("User");
    return user;
  }

  async getAllUsers(): Promise<User[]> {
    return await this.userRepository.getAllUsers();
  }

  async updateUser(
    userId: number,
    userData: UpdateUserDTO
  ): Promise<User | null> {
    const checkUser = await this.userRepository.getUserById(userId);
    if (!checkUser) throw new NotFoundException("User");
    if (userData.data.username) checkUser.username = userData.data.username;
    return await this.userRepository.updateUser(checkUser);
  }
}
