import { Module } from "../../../adapters/http/module";
import { AuthRepository } from "../../../repositories/auth.repository";
import { SignInController } from "./sign-in.controller";
import { SignInUseCase } from "./sign-in.usecase";

export class SignInModule extends Module<AuthRepository> {
  useCase = SignInUseCase;
  controller = SignInController;
}
