import { Controller } from "../../../adapters/http/controller";
import { FindSessionsUseCase } from "./find-sessions.usecase";

export class FindSessionsControler extends Controller<FindSessionsUseCase> {
  public execute() {
    return this.handleResult({});
  }
}
