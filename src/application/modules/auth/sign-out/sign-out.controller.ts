import {
  Controller,
  ControllerResponse,
} from "../../../../infra/http/adapters/controller-adapter";
import { SignOutUseCase } from "./sign-out.usecase";

export class SignOutControler extends Controller<SignOutUseCase> {
  public execute(): Promise<ControllerResponse> {
    return this.handleResult({});
  }
}
