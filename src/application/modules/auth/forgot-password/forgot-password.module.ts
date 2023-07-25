import { Module } from "../../../adapters/http/module";
import { AuthRepository } from "../../../repositories/auth.repository";
import { ForgotPasswordController } from "./forgot-password.controller";
import { ForgotPasswordUseCase } from "./forgot-password.usecase";

export class ForgotPasswordModule extends Module {
  useCase = ForgotPasswordUseCase;
  controller = ForgotPasswordController;
}
