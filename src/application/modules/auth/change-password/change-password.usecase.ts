import { AuthRepository } from "../../../repositories/auth.repository";

export class ChangePasswordUseCase {
  constructor(private repository: AuthRepository) {}

  async execute() {}
}
