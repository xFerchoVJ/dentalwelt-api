import { Request, Response } from "express";
import prismadb from "../lib/prismadb";
import bcrypt from "bcrypt";
import { User } from "../models/User";
import { handleServerError } from "../helpers/errorHelper";
import { AuthenticatedRequest } from "../models/Auth";

const getUsers = async (req: Request, res: Response): Promise<void> => {
  try {
    const users: Omit<User, "password">[] | null = await prismadb.user.findMany(
      {
        select: {
          id: true,
          email: true,
        },
      }
    );
    if (!users) throw new Error("No se encontraron usuarios");
    res.json({ users });
  } catch (error) {
    handleServerError(res, error);
  }
};

const createUser = async (req: Request, res: Response): Promise<void> => {
  try {
    const { email, password }: User = req.body;

    const existingUser: User | null = await prismadb.user.findFirst({
      where: { email },
    });

    if (existingUser) {
      res.status(400).json({ error: "El usuario ya existe." });
      return;
    }

    const hashedPassword: string = await bcrypt.hash(password, 8);

    const newUser: User = await prismadb.user.create({
      data: {
        email,
        password: hashedPassword,
      },
    });

    res.json({
      message: "Usuario creado.",
      user: {
        id: newUser.id,
        email: newUser.email,
      },
    });
  } catch (error) {
    handleServerError(res, error);
  }
};

const deleteUser = async (req: Request, res: Response): Promise<void> => {
  try {
    const userId: number = parseInt(req.params.id);

    if (isNaN(userId)) {
      res.status(400).json({ error: "ID de usuario no válido." });
      return;
    }

    const existingUser: User | null = await prismadb.user.findFirst({
      where: { id: userId },
    });

    if (!existingUser) {
      res.status(404).json({ msg: "Usuario no encontrado." });
      return;
    }

    const deletedUser: User | null = await prismadb.user.delete({
      where: {
        id: userId,
      },
    });

    res.json({ msg: "Usuario eliminado.", deletedUser });
  } catch (error) {
    handleServerError(res, error);
  }
};

const getProfile = (req: AuthenticatedRequest, res: Response) => {
  const { userId } = req;
  res.json(userId);
};

export { getUsers, createUser, deleteUser, getProfile };
