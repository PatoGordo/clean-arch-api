import { AuthMiddlewareModule } from "../../../application/middlewares/auth/auth.module";
import { InMemoryAuthRepository } from "../../database/in-memory/repositories/in-memory-auth.repository";

const repository = new InMemoryAuthRepository();

export const authMiddleware = new AuthMiddlewareModule(repository);
