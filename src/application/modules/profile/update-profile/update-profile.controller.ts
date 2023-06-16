import {
  Controller,
  ControllerResponse,
} from "../../../../infra/http/adapters/controller-adapter";
import { UpdateProfileUseCase } from "./update-profile.usecase";

export class UpdateProfileControler extends Controller<UpdateProfileUseCase> {
  public execute(): Promise<ControllerResponse> {
    return this.handleResult({});
  }
}
