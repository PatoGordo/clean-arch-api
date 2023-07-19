import { Controller } from "../../../adapters/http/controller";
import { SignUpUseCase } from "./sign-up.usecase";

export class SignUpController extends Controller<SignUpUseCase> {
  public execute() {
    return this.handleResult({
      result: true,
    });
  }
}
