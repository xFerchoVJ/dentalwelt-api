import express, { Application, NextFunction, Request, Response } from "express";
import { config } from "dotenv";
import morgan from "morgan";
import userRouter from "./routes/userRoutes";
config();

const app: Application = express();

//Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan("dev"));

//Routes
app.use("/api/users", userRouter);
app.use((req: Request, res: Response, next: NextFunction) => {
  const error = new Error("Ruta no encontrada");
  res.status(404).json({ error: error.message });
});

export default app;
