import { Request, Response } from "express";
import { getRepository } from "typeorm";
import { Comment } from "../entity/Comment";
import { Blog } from "../entity/Blog";

export class CommentController {
  static async addComment(req: Request, res: Response) {
    const commentRepository = getRepository(Comment);
    const blogRepository = getRepository(Blog);
    const { content, blogId } = req.body;

    const blog = await blogRepository.findOne(blogId);
    if (!blog) {
      return res.status(404).send("Blog not found");
    }

    const comment = commentRepository.create({
      content,
      user: req.user,
      blog,
    });

    await commentRepository.save(comment);
    res.status(201).send(comment);
  }

  static async deleteComment(req: Request, res: Response) {
    const commentRepository = getRepository(Comment);
    const { id } = req.params;

    const comment = await commentRepository.findOne(id);
    if (
      !comment ||
      (comment.user.id !== req.user.id && req.user.role !== UserRole.ADMIN)
    ) {
      return res.sendStatus(403);
    }

    await commentRepository.remove(comment);
    res.sendStatus(204);
  }
}
