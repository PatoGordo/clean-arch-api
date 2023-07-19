import { Controller } from "../../../adapters/http/controller";
import { FindProfileUseCase } from "./find-profile.usecase";

export class FindProfileController extends Controller<FindProfileUseCase> {
  public execute() {
    return this.handleResult({});
  }
}
