import { Router } from "express";

const appRouter = Router();

appRouter.get("/", (req, res) => {
  res.status(200).send("Hello World");
});

export { appRouter };
