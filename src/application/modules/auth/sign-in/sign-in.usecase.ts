import { AuthRepository } from "../../../repositories/auth.repository";

export class SignInUseCase {
  constructor(private repository: AuthRepository) {}

  async execute() {}
}
