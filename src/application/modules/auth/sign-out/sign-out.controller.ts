import { Controller } from "../../../adapters/http/controller";
import { SignOutUseCase } from "./sign-out.usecase";

export class SignOutControler extends Controller<SignOutUseCase> {
  public execute() {
    return this.handleResult({});
  }
}
