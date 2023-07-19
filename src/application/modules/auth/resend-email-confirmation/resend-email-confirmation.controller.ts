import { Controller } from "../../../adapters/http/controller";
import { ResendEmailConfirmationUseCase } from "./resend-email-confirmation.usecase";

export class ResendEmailConfirmationController extends Controller<ResendEmailConfirmationUseCase> {
  public execute() {
    return this.handleResult({});
  }
}
