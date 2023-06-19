import { AuthRepository } from "../../../repositories/auth.repository";
import { SignInDTO } from "./sign-in.dto";

export class SignInUseCase {
  constructor(private repository: AuthRepository) {}

  async execute(data: SignInDTO) {
    const res = await this.repository.signIn(data);

    return res;
  }
}
