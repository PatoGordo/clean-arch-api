import { Router } from "express";
import { SignInControler } from "../../../application/modules/auth/sign-in/sign-in.controller";
import { SignInUseCase } from "../../../application/modules/auth/sign-in/sign-in.usecase";

const authRouter = Router();

export { authRouter };
