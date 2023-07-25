import { Module } from "../../../adapters/http/module";
import { AuthRepository } from "../../../repositories/auth.repository";
import { ResendEmailConfirmationController } from "./resend-email-confirmation.controller";
import { ResendEmailConfirmationUseCase } from "./resend-email-confirmation.usecase";

export class ResendEmailConfirmationModule extends Module {
  useCase = ResendEmailConfirmationUseCase;
  controller = ResendEmailConfirmationController;
}
