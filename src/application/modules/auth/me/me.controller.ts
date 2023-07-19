import { Controller } from "../../../adapters/http/controller";
import { MeUseCase } from "./me.usecase";

export class MeController extends Controller<MeUseCase> {
  public execute() {
    return this.handleResult({});
  }
}
