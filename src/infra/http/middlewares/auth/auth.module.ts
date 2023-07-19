import { Module } from "../../../../application/adapters/http/module";
import { AuthRepository } from "../../../../application/repositories/auth.repository";
import { AuthMiddlewareController } from "./auth.controller";
import { AuthMiddlwareUseCase } from "./auth.usecase";

export class AuthMiddlewareModule extends Module<AuthRepository> {
  useCase = AuthMiddlwareUseCase;
  controller = AuthMiddlewareController;
}
