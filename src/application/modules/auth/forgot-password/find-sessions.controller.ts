import {
  Controller,
  ControllerResponse,
} from "../../../../infra/http/adapters/controller-adapter";
import { ForgotPasswordUseCase } from "./forgot-password.usecase";

export class ForgotPasswordControler extends Controller<ForgotPasswordUseCase> {
  public execute(): Promise<ControllerResponse> {
    return this.handleResult({});
  }
}
