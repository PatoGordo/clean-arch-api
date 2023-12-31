import {
  Controller,
  ControllerResponse,
} from "../../../../infra/http/adapters/controller-adapter";
import { ChangePasswordUseCase } from "./change-password.usecase";

export class ChangePasswordController extends Controller<ChangePasswordUseCase> {
  public execute(): Promise<ControllerResponse> {
    return this.handleResult({});
  }
}
