import express, { Application, NextFunction, Request, Response } from "express";
import { config } from "dotenv";
config();

const app: Application = express();

app.use((req: Request, res: Response, next: NextFunction) => {
  const error = new Error('Ruta no encontrada');
  res.status(404).json({ error: error.message })
})

export default app;
