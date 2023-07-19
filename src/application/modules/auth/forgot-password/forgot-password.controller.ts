import { Controller } from "../../../adapters/http/controller";
import { ForgotPasswordUseCase } from "./forgot-password.usecase";

export class ForgorPasswordController extends Controller<ForgotPasswordUseCase> {
  public execute() {
    return this.handleResult({});
  }
}
