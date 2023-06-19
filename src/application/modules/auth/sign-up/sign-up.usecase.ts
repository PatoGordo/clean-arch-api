import { AuthRepository } from "../../../repositories/auth.repository";
import { SignUpDTO } from "./sign-up.dto";

export class SignUpUseCase {
  constructor(private repository: AuthRepository) {}

  async execute(data: SignUpDTO) {
    const res = await this.repository.signUp(data);

    return res;
  }
}
