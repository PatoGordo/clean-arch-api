import { Controller } from "../../../adapters/http/controller";
import { SignOutUseCase } from "./sign-out.usecase";

export class SignOutController extends Controller<SignOutUseCase> {
  public execute() {
    return this.handleResult({});
  }
}
