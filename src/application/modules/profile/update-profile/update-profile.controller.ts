import { Controller } from "../../../adapters/http/controller";
import { UpdateProfileUseCase } from "./update-profile.usecase";

export class UpdateProfileControler extends Controller<UpdateProfileUseCase> {
  public execute() {
    return this.handleResult({});
  }
}
