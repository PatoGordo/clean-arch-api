import { AuthRepository } from "../../../repositories/auth.repository";

export class ResendEmailConfirmationUseCase {
  constructor(private repository: AuthRepository) {}

  async execute() {}
}
