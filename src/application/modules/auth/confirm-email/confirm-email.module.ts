import { Module } from "../../../adapters/http/module";
import { AuthRepository } from "../../../repositories/auth.repository";
import { ConfirmEmailController } from "./confirm-email.controller";
import { ConfirmEmailUseCase } from "./confirm-email.usecase";

export class ConfirmEmailModule extends Module<AuthRepository> {
  useCase = ConfirmEmailUseCase;
  controller = ConfirmEmailController;
}
