import { AuthRepository } from "../../../repositories/auth.repository";

export class EndSessionUseCase {
  constructor(private repository: AuthRepository) {}

  async execute() {}
}
