import { AuthRepository } from "../../../repositories/auth.repository";

export class FindSessionsUseCase {
  constructor(private repository: AuthRepository) {}

  async execute() {}
}
