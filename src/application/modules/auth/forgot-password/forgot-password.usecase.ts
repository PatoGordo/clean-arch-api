import { UseCase } from "../../../adapters/http/usecase";
import { AuthRepository } from "../../../repositories/auth.repository";
import { ForgotPasswordDTO } from "./forgot-password.dto";

export class ForgotPasswordUseCase extends UseCase<AuthRepository> {
  async execute(data: ForgotPasswordDTO) {
    const res = await this.repository.forgotPassword(data);

    return res;
  }
}
