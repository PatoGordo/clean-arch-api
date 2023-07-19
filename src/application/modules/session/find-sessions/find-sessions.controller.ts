import { Controller } from "../../../adapters/http/controller";
import { FindSessionsUseCase } from "./find-sessions.usecase";

export class FindSessionsController extends Controller<FindSessionsUseCase> {
  public execute() {
    return this.handleResult({});
  }
}
