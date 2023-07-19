import { UseCase } from "../../../adapters/http/usecase";
import { AuthRepository } from "../../../repositories/auth.repository";
import { SignInDTO } from "./sign-in.dto";

export class SignInUseCase extends UseCase<AuthRepository> {
  async execute(data: SignInDTO) {
    const res = await this.repository.signIn(data);

    return res;
  }
}
