import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm";
import { User } from "./User";

@Entity()
export class Blog {
  @PrimaryGeneratedColumn()
  id: number = 0;

  @Column()
  title: string = "";

  @Column()
  content: string = "";

  @ManyToOne(() => User, (user) => user.blogs)
  author: User = new User();
}
