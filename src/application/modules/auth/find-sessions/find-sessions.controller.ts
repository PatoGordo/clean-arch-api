import {
  Controller,
  ControllerResponse,
} from "../../../../infra/http/adapters/controller-adapter";
import { FindSessionsUseCase } from "./find-sessions.usecase";

export class FindSessionsControler extends Controller<FindSessionsUseCase> {
  public execute(): Promise<ControllerResponse> {
    return this.handleResult({});
  }
}
