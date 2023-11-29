import { CreateUserDTO } from "@src/app/dtos/user/CreateUserDTO";
import { UpdateUserDTO } from "@src/app/dtos/user/UpdateUserDTO";
import { User } from "@src/app/models/User";

export interface IUserService {
  createUser(createUserDTO: CreateUserDTO): Promise<User>;
  getUserById(userId: number): Promise<User | null>;
  getAllUsers(): Promise<User[]>;
  updateUser(userId: number, userData: UpdateUserDTO): Promise<User | null>;
}
