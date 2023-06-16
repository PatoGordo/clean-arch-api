import {
  Controller,
  ControllerResponse,
} from "../../../../infra/http/adapters/controller-adapter";
import { ResetPasswordUseCase } from "./reset-password.usecase";

export class ResetPasswordControler extends Controller<ResetPasswordUseCase> {
  public execute(): Promise<ControllerResponse> {
    return this.handleResult({});
  }
}
