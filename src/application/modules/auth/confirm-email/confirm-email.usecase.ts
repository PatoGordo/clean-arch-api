import { AuthRepository } from "../../../repositories/auth.repository";

export class ConfirmEmailUseCase {
  constructor(private repository: AuthRepository) {}

  async execute() {}
}
