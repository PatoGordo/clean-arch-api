import { AuthRepository } from "../../../repositories/auth.repository";

export class SignOutUseCase {
  constructor(private repository: AuthRepository) {}

  async execute() {}
}
