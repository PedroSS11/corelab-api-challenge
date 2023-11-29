import { Model, Table, Column, DataType, HasMany } from "sequelize-typescript";
import { Post } from "./Post";
import { IUserAttributes } from "./interfaces/IUser";

@Table
export class User extends Model<IUserAttributes> implements IUserAttributes {
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  username!: string;

  @HasMany(() => Post)
  posts!: Post[];
}
