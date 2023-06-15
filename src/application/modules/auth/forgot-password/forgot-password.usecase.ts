import { AuthRepository } from "../../../repositories/auth.repository";

export class ForgotPasswordUseCase {
  constructor(private repository: AuthRepository) {}

  async execute() {}
}
