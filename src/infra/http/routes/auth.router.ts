import { Router } from "express";
import { SignInModule } from "../../../application/modules/auth/sign-in/sign-in.module";
import { InMemoryAuthRepository } from "../../database/in-memory/repositories/in-memory-auth.repository";
import { SignUpModule } from "../../../application/modules/auth/sign-up/sign-up.module";

const authRepository = new InMemoryAuthRepository();

const signIn = new SignInModule(authRepository);
const signUp = new SignUpModule(authRepository);

const authRouter = Router();

authRouter.post("/sign-in", signIn.execute().handler);
authRouter.post("/sign-up", signUp.execute().handler);

export { authRouter };
