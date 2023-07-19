import { UseCase } from "../../../adapters/http/usecase";
import { AuthRepository } from "../../../repositories/auth.repository";

export class ConfirmEmailUseCase extends UseCase<AuthRepository> {
  async execute() {}
}
