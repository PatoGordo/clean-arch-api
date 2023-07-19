import { Module } from "../../../adapters/http/module";
import { AuthRepository } from "../../../repositories/auth.repository";
import { SignUpController } from "./sign-up.controller";
import { SignUpUseCase } from "./sign-up.usecase";

export class SignUpModule extends Module<AuthRepository> {
  useCase = SignUpUseCase;
  controller = SignUpController;
}
