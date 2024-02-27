import express, { Application, Request, Response } from "express";
import { config } from "dotenv";
config();

const app: Application = express();

app.get("/", (_, res: Response) => {
  res.send("Hello world!, todo bien");
});

export default app;
