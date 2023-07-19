import { InMemoryAuthRepository } from "../../database/in-memory/repositories/in-memory-auth.repository";
import { AuthMiddlewareModule } from "./auth/auth.module";

const repository = new InMemoryAuthRepository();

export const authMiddleware = new AuthMiddlewareModule(repository);
