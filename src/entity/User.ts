import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
import { Blog } from "./Blog";
import { Comment } from "./Comment";

export enum UserRole {
  USER = "user",
  BLOGGER = "blogger",
  ADMIN = "admin",
}

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number = 0;

  @Column()
  username: string = "";

  @Column()
  password: string = "";

  @Column({
    type: "enum",
    enum: UserRole,
    default: UserRole.USER,
  })
  role: UserRole = UserRole.USER;

  @OneToMany(() => Blog, (blog) => blog.author)
  blogs: Blog[] = [];

  @OneToMany(() => Comment, (comment) => comment.user)
  comments: Comment[] = [];
}
