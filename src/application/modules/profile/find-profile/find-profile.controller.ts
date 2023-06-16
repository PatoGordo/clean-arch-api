import {
  Controller,
  ControllerResponse,
} from "../../../../infra/http/adapters/controller-adapter";
import { FindProfileUseCase } from "./find-profile.usecase";

export class FindProfileControler extends Controller<FindProfileUseCase> {
  public execute(): Promise<ControllerResponse> {
    return this.handleResult({});
  }
}
