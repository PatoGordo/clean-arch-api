import {
  Controller,
  ControllerResponse,
} from "../../../../infra/http/adapters/controller-adapter";
import { SignInUseCase } from "./sign-in.usecase";

export class SignInControler extends Controller<SignInUseCase> {
  public execute(): Promise<ControllerResponse> {
    return this.handleResult({});
  }
}
