import { Controller } from "../../../adapters/http/controller";
import { UpdateProfileUseCase } from "./update-profile.usecase";

export class UpdateProfileController extends Controller<UpdateProfileUseCase> {
  public execute() {
    return this.handleResult({});
  }
}
