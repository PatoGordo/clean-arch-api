import {
  Controller,
  ControllerResponse,
} from "../../../../infra/http/adapters/controller-adapter";
import { SignUpUseCase } from "./sign-up.usecase";

export class SignUpControler extends Controller<SignUpUseCase> {
  public execute(): Promise<ControllerResponse> {
    return this.handleResult({});
  }
}
