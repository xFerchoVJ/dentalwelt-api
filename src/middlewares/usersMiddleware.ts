import { Request, Response, NextFunction } from "express";
import { User } from "../models/User";

export const validateUserFields = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  const { email, password }: User = req.body;

  if (!email || !password) {
    res.status(400).json({
      error: "El correo electrónico y la contraseña son obligatorios.",
    });
    return;
  }

  next();
};
