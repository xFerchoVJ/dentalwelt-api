import { Request, Response } from "express";
import bcrypt from "bcrypt";
import { User } from "../models/User";
import prismadb from "../lib/prismadb";
import generateJWT from "../helpers/generateJWT";

const login = async (req: Request, res: Response): Promise<void> => {
  const { email, password }: User = req.body;

  const user = await prismadb.user.findUnique({
    where: { email },
  });

  if (!user) {
    res.status(404).json({ error: "Usuario no encontrado" });
    return;
  }

  const passwordMatch = await bcrypt.compare(password, user.password);

  if (!passwordMatch) {
    res.status(400).json({ error: "El email y contraseña no son validos" });
    return;
  }

  res.json({
    id: user.id,
    email: user.email,
    token: generateJWT(user.id),
  });
};
export { login };
