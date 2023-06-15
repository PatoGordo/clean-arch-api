import { AuthRepository } from "../../../repositories/auth.repository";

export class ResetPasswordUseCase {
  constructor(private repository: AuthRepository) {}

  async execute() {}
}
