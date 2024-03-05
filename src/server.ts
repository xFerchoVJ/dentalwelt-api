import express, { Application, NextFunction, Request, Response } from "express";
import { config } from "dotenv";
import userRouter from './routes/userRoutes';
config();

const app: Application = express();


app.use('/api/users', userRouter);
app.use((req: Request, res: Response, next: NextFunction) => {
  const error = new Error('Ruta no encontrada');
  res.status(404).json({ error: error.message })
})

export default app;
