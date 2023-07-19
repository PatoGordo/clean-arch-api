import { UseCase } from "../../../adapters/http/usecase";
import { AuthRepository } from "../../../repositories/auth.repository";

export class ResetPasswordUseCase extends UseCase<AuthRepository> {
  async execute() {}
}
