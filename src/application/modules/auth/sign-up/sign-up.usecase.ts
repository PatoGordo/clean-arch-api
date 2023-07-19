import { UseCase } from "../../../adapters/http/usecase";
import { AuthRepository } from "../../../repositories/auth.repository";
import { SignUpDTO } from "./sign-up.dto";

export class SignUpUseCase extends UseCase<AuthRepository> {
  async execute(data: SignUpDTO) {
    const res = await this.repository.signUp(data);

    return res;
  }
}
