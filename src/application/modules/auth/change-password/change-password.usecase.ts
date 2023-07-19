import { UseCase } from "../../../adapters/http/usecase";
import { AuthRepository } from "../../../repositories/auth.repository";

export class ChangePasswordUseCase extends UseCase<AuthRepository> {
  async execute() {}
}
