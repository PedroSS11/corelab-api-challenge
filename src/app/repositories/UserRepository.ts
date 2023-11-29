import { User } from "../models/User";
import { IUserRepository } from "./interfaces/IUserRepository";

export class UserRepository implements IUserRepository {
  async createUser(username: string): Promise<User> {
    return await User.create({ username });
  }

  async getUserById(userId: number): Promise<User | null> {
    return await User.findByPk(userId);
  }

  async getAllUsers(): Promise<User[]> {
    return await User.findAll({ order: [["id", "ASC"]] });
  }

  async updateUser(updatedCheckedUser: User): Promise<User | null> {
    return await updatedCheckedUser.save();
  }
}
