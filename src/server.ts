import express, { Application, NextFunction, Request, Response } from "express";
import { config } from "dotenv";
import morgan from "morgan";
import cors from "cors";
import { authRoutes, promotionRoutes, userRoutes } from "./routes";

config();

const app: Application = express();

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan("dev"));

// Configuración de CORS
const FRONT_URL_DEV = process.env.FRONT_URL_DEV || "http://localhost:3000";
const FRONT_URL_PRD = process.env.FRONT_URL_PRD || "https://example.com";
const allowedOrigins: (string | boolean | RegExp)[] = [
  FRONT_URL_DEV,
  FRONT_URL_PRD,
];
const corsOptions: cors.CorsOptions = {
  origin: allowedOrigins,
};
app.use(cors(corsOptions));

// Rutas
app.use("/api/users", userRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/promotions", promotionRoutes);

// Middleware para manejar rutas no encontradas
app.use((req: Request, res: Response, next: NextFunction) => {
  const error = new Error("Ruta no encontrada");
  res.status(404).json({ error: error.message });
});

export default app;
