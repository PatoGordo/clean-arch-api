import { AuthRepository } from "../../../repositories/auth.repository";

export class SignUpUseCase {
  constructor(private repository: AuthRepository) {}

  async execute() {}
}
