import { Request, Response } from "express";
import { getRepository } from "typeorm";
import { User } from "../entity/User";
import { compare, hash } from "bcryptjs";
import { sign } from "jsonwebtoken";

export class AuthController {
  static async register(req: Request, res: Response) {
    const userRepository = getRepository(User);
    const { username, password, role } = req.body;

    const hashedPassword = await hash(password, 10);
    const user = userRepository.create({
      username,
      password: hashedPassword,
      role,
    });
    await userRepository.save(user);

    res.status(201).send("User registered");
  }

  static async login(req: Request, res: Response) {
    const userRepository = getRepository(User);
    const { username, password } = req.body;

    const user = await userRepository.findOne({ where: { username } });
    if (!user || !(await compare(password, user.password))) {
      return res.status(401).send("Invalid credentials");
    }

    const token = sign({ id: user.id, role: user.role }, "your_jwt_secret", {
      expiresIn: "1h",
    });
    res.json({ token });
  }
}
