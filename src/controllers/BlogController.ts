import { Request, Response } from "express";
import { getRepository } from "typeorm";
import { Blog } from "../entity/Blog";
import { UserRole } from "../entity/User";

export class BlogController {
  static async addBlog(req: Request, res: Response) {
    const blogRepository = getRepository(Blog);
    const { title, content } = req.body;

    const blog = blogRepository.create({
      title,
      content,
      author: user,
    });

    await blogRepository.save(blog);
    res.status(201).send(blog);
  }

  static async editBlog(req: Request, res: Response) {
    const blogRepository = getRepository(Blog);
    const { id } = req.params;
    const { title, content } = req.body;

    const blog = await blogRepository.findOne(id);
    if (
      !blog ||
      (blog.author.id !== req.user.id && req.user.role !== UserRole.ADMIN)
    ) {
      return res.sendStatus(403);
    }

    blog.title = title;
    blog.content = content;
    await blogRepository.save(blog);

    res.send(blog);
  }

  static async deleteBlog(req: Request, res: Response) {
    const blogRepository = getRepository(Blog);
    const { id } = req.params;

    const blog = await blogRepository.findOne(id);
    if (
      !blog ||
      (blog.author.id !== req.user.id && req.user.role !== UserRole.ADMIN)
    ) {
      return res.sendStatus(403);
    }

    await blogRepository.remove(blog);
    res.sendStatus(204);
  }
}
