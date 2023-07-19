import { Controller } from "../../../adapters/http/controller";
import { ChangePasswordUseCase } from "./change-password.usecase";

export class ChangePasswordController extends Controller<ChangePasswordUseCase> {
  public execute() {
    return this.handleResult({});
  }
}
