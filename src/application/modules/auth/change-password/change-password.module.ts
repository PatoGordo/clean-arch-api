import { Module } from "../../../adapters/http/module";
import { AuthRepository } from "../../../repositories/auth.repository";

export class ChangePasswordUseCaseModule extends Module<AuthRepository> {
  useCase = ChangePasswordUseCaseModule;
  controller = ChangePasswordUseCaseModule;
}
