import { Router } from "express";
import { SignInControler } from "../../../application/modules/auth/sign-in/sign-in.controller";
import { SignInUseCase } from "../../../application/modules/auth/sign-in/sign-in.usecase";

const authRouter = Router();

authRouter.post(
  "/sign-in",
  new SignInControler(new SignInUseCase(1 as any)).handler,
);

export { authRouter };
