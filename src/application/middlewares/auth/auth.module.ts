import { Module } from "../../../application/adapters/http/module";
import { AuthMiddlewareController } from "./auth.controller";
import { AuthMiddlwareUseCase } from "./auth.usecase";

export class AuthMiddlewareModule extends Module {
  useCase = AuthMiddlwareUseCase;
  controller = AuthMiddlewareController;
}
