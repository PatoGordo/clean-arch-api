import { Router } from "express";
import { authRouter } from "./auth.router";
import { profileRouter } from "./profile.router";

const appRouter = Router();

appRouter.use("/auth", authRouter);
appRouter.use("/profile", profileRouter);

appRouter.get("/", (_req, res) => {
  res.status(200).send("Hello World");
});

export { appRouter };
