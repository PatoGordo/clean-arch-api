import { AuthRepository } from "../../../repositories/auth.repository";
import { ForgotPasswordDTO } from "./forgot-password.dto";

export class ForgotPasswordUseCase {
  constructor(private authRepository: AuthRepository) {}

  async execute(data: ForgotPasswordDTO) {
    const user = await this.authRepository.findUserByEmail(data);

    if (!user) {
      throw new Error();
    }

    return user;
  }
}
