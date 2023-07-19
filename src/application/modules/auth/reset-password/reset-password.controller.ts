import { Controller } from "../../../adapters/http/controller";
import { ResetPasswordUseCase } from "./reset-password.usecase";

export class ResetPasswordController extends Controller<ResetPasswordUseCase> {
  public execute() {
    return this.handleResult({});
  }
}
