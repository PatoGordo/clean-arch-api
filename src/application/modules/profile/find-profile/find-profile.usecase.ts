import { ProfileRepository } from "../../../repositories/profile.repository";

export class FindProfileUseCase {
  constructor(private repository: ProfileRepository) {}

  async execute() {}
}
