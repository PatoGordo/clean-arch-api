import {
  Controller,
  ControllerResponse,
} from "../../../../infra/http/adapters/controller-adapter";
import { ResendEmailConfirmationUseCase } from "./resend-email-confirmation.usecase";

export class ResendemailConfirmationControler extends Controller<ResendEmailConfirmationUseCase> {
  public execute(): Promise<ControllerResponse> {
    return this.handleResult({});
  }
}
