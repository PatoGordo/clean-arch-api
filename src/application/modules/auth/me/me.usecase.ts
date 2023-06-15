import { AuthRepository } from "../../../repositories/auth.repository";

export class MeUseCase {
  constructor(private repository: AuthRepository) {}

  async execute() {}
}
