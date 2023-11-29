import {
  Model,
  Table,
  Column,
  ForeignKey,
  BelongsTo,
  DataType,
} from "sequelize-typescript";
import { User } from "./User";
import { IPostAttributes } from "./interfaces/IPost";

@Table
export class Post extends Model<IPostAttributes> implements IPostAttributes {
  @Column({ type: DataType.STRING, allowNull: false })
  title!: string;

  @Column({ type: DataType.TEXT, allowNull: true })
  content!: string | null;

  @Column({ type: DataType.STRING, allowNull: true })
  color!: string | null;

  @Column({ type: DataType.BOOLEAN, allowNull: false, defaultValue: false })
  favorited!: boolean;

  @ForeignKey(() => User)
  @Column
  userId!: number;

  @BelongsTo(() => User)
  user!: User;
}
