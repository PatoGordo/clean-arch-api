import { UseCase } from "../../../adapters/http/usecase";
import { AuthRepository } from "../../../repositories/auth.repository";
import { SignOutDTO } from "./sign-out.dto";

export class SignOutUseCase extends UseCase<AuthRepository> {
  async execute(data: SignOutDTO) {
    await this.repository.deleteSession(data);
  }
}
