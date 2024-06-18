import { Router } from "express";
import { AuthController } from "./controllers/AuthController";
import { BlogController } from "./controllers/BlogController";
import { CommentController } from "./controllers/CommentController";
import { authenticateJWT, authorize } from "./middleware/auth";
import { UserRole } from "./entity/User";

const router = Router();

router.post("/register", AuthController.register);
router.post("/login", AuthController.login);

router.post(
  "/blogs",
  authenticateJWT,
  authorize([UserRole.BLOGGER, UserRole.ADMIN]),
  BlogController.addBlog
);
router.put(
  "/blogs/:id",
  authenticateJWT,
  authorize([UserRole.BLOGGER, UserRole.ADMIN]),
  BlogController.editBlog
);
router.delete(
  "/blogs/:id",
  authenticateJWT,
  authorize([UserRole.ADMIN]),
  BlogController.deleteBlog
);

router.post(
  "/comments",
  authenticateJWT,
  authorize([UserRole.USER, UserRole.BLOGGER, UserRole.ADMIN]),
  CommentController.addComment
);
router.delete(
  "/comments/:id",
  authenticateJWT,
  authorize([UserRole.ADMIN]),
  CommentController.deleteComment
);

export default router;
