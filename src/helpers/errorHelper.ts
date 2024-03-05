import { Response } from "express";


export const handleServerError = (res: Response, error: any): void => {
  console.error("Error:", error);
  if (error instanceof Error) {
    res.status(500).json({ error: "Ha ocurrido un error en el servidor." });
  } else {
    res.status(500).json({ error: "Ha ocurrido un error en el servidor." });
  }
};
