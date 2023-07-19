import { Module } from "../../../adapters/http/module";
import { AuthRepository } from "../../../repositories/auth.repository";
import { SignUpControler } from "./sign-up.controller";
import { SignUpUseCase } from "./sign-up.usecase";

export class SignUpModule extends Module<AuthRepository> {
  execute() {
    const useCase = new SignUpUseCase(this.repository);

    const controller = new SignUpControler(useCase);

    return controller;
  }
}
