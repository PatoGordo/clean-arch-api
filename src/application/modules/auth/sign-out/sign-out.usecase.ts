import { AuthRepository } from "../../../repositories/auth.repository";
import { SignOutDTO } from "./sign-out.dto";

export class SignOutUseCase {
  constructor(private repository: AuthRepository) {}

  async execute(data: SignOutDTO) {
    await this.repository.deleteSession(data);
  }
}
