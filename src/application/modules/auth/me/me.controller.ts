import { Controller } from "../../../adapters/http/controller";
import { MeUseCase } from "./me.usecase";

export class MeControler extends Controller<MeUseCase> {
  public execute() {
    return this.handleResult({});
  }
}
