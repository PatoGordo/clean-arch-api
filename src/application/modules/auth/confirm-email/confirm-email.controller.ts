import { Controller } from "../../../adapters/http/controller";
import { ConfirmEmailUseCase } from "./confirm-email.usecase";

export class ConfirmEmailControler extends Controller<ConfirmEmailUseCase> {
  public execute() {
    return this.handleResult({});
  }
}
