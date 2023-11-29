import { User } from "@src/app/models/User";

export interface IUserRepository {
  createUser(username: string): Promise<User>;
  getUserById(userId: number): Promise<User | null>;
  getAllUsers(): Promise<User[]>;
  updateUser(updatedCheckedUser: User): Promise<User | null>;
}
