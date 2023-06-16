import {
  Controller,
  ControllerResponse,
} from "../../../../infra/http/adapters/controller-adapter";
import { ConfirmEmailUseCase } from "./confirm-email.usecase";

export class ConfirmEmailControler extends Controller<ConfirmEmailUseCase> {
  public execute(): Promise<ControllerResponse> {
    return this.handleResult({});
  }
}
