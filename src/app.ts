import express from "express";
import cors from "cors";
import { appRouter } from "./infra/routes/app.router";

const app = express();

app.use(express.json());

app.use(cors());

app.use("/api", appRouter);

export { app };
