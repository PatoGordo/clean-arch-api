import { Controller } from "../../../adapters/http/controller";
import { ConfirmEmailUseCase } from "./confirm-email.usecase";

export class ConfirmEmailController extends Controller<ConfirmEmailUseCase> {
  public execute() {
    return this.handleResult({});
  }
}
