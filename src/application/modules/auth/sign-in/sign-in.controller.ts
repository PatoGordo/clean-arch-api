import { Controller } from "../../../adapters/http/controller";
import { SignInUseCase } from "./sign-in.usecase";

export class SignInControler extends Controller<SignInUseCase> {
  public async execute() {
    const body = await this.getBody();

    return this.handleResult({
      result: body,
    });
  }
}
