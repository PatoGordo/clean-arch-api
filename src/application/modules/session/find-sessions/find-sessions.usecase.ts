import { UseCase } from "../../../adapters/http/usecase";
import { AuthRepository } from "../../../repositories/auth.repository";

export class FindSessionsUseCase extends UseCase<AuthRepository> {
  async execute() {}
}
