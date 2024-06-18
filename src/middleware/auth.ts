import { Request, Response, NextFunction } from "express";
import { verify } from "jsonwebtoken";
import { User, UserRole } from "../entity/User";
import { getRepository } from "typeorm";

export const authenticateJWT = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const token = req.headers.authorization?.split(" ")[1];

  if (!token) {
    return res.sendStatus(403);
  }

  try {
    const decoded: any = verify(token, "your_jwt_secret");
    const userRepository = getRepository(User);
    const user = await userRepository.findOne(decoded.id);
    if (!user) {
      return res.sendStatus(403);
    }
    req.user = user;
    next();
  } catch (err) {
    res.sendStatus(403);
  }
};

export const authorize = (roles: UserRole[]) => {
  return (req: Request, res: Response, next: NextFunction) => {
    if (!roles.includes(req.user.role)) {
      return res.sendStatus(403);
    }
    next();
  };
};
