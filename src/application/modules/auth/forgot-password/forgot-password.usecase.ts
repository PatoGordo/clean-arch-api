import { AuthRepository } from "../../../repositories/auth.repository";
import { ForgotPasswordDTO } from "./forgot-password.dto";

export class ForgotPasswordUseCase {
  constructor(private repository: AuthRepository) {}

  async execute(data: ForgotPasswordDTO) {
    const res = await this.repository.forgotPassword(data);

    return res;
  }
}
