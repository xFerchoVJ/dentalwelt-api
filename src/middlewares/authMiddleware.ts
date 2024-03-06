import { NextFunction, Request, Response } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
import prismadb from "../lib/prismadb";
import { User } from "../models/User";
import { AuthenticatedRequest } from "../models/Auth";

// Define una interfaz que extienda el tipo Request para incluir la propiedad userId.

const JWT_SECRET: string = process.env.JWT_SECRET || "jwtsignsecret";

const isAuthenticated = async (
  req: AuthenticatedRequest, // Usa el tipo definido en lugar del tipo Request estándar.
  res: Response,
  next: NextFunction
) => {
  try {
    const token = extractToken(req);
    if (!token) {
      return res.status(401).json({ error: "Sin Autorización." });
    }

    const decoded = jwt.verify(token, JWT_SECRET) as JwtPayload;
    req.userId = decoded.id;
    return next();
  } catch (err) {
    console.error(`Error [AUTH]: ${err instanceof Error ? err.message : err}`);
    return res.status(401).json({ error: "Sin Autorización." });
  }
};

const extractToken = (req: AuthenticatedRequest): string | null => {
  const authorizationHeader = req.headers.authorization;
  if (authorizationHeader && authorizationHeader.startsWith("Bearer")) {
    const [, token] = authorizationHeader.split(" ");
    return token || null;
  }
  return null;
};

export default isAuthenticated;
