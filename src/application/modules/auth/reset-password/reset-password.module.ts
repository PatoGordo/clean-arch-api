import { Module } from "../../../adapters/http/module";
import { AuthRepository } from "../../../repositories/auth.repository";
import { ResetPasswordController } from "./reset-password.controller";
import { ResetPasswordUseCase } from "./reset-password.usecase";

export class ResetPasswordModule extends Module<AuthRepository> {
  useCase = ResetPasswordUseCase;
  controller = ResetPasswordController;
}
