import {
  Controller,
  ControllerResponse,
} from "../../../../infra/http/adapters/controller-adapter";
import { EndSessionUseCase } from "./end-session.usecase";

export class EndSessionControler extends Controller<EndSessionUseCase> {
  public execute(): Promise<ControllerResponse> {
    return this.handleResult({});
  }
}
