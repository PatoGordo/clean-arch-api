import { Controller } from "../../../adapters/http/controller";
import { EndSessionUseCase } from "./end-session.usecase";

export class EndSessionControler extends Controller<EndSessionUseCase> {
  public execute() {
    return this.handleResult({});
  }
}
