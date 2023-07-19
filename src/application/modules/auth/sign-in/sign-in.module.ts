import { AuthRepository } from "../../../repositories/auth.repository";
import { SignInControler } from "./sign-in.controller";
import { SignInUseCase } from "./sign-in.usecase";

export class SignInModule {
  constructor(private repository: AuthRepository) {}

  execute() {
    const useCase = new SignInUseCase(this.repository);

    const controller = new SignInControler(useCase);

    return controller;
  }
}
