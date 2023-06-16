import {
  Controller,
  ControllerResponse,
} from "../../../../infra/http/adapters/controller-adapter";
import { MeUseCase } from "./me.usecase";

export class MeControler extends Controller<MeUseCase> {
  public execute(): Promise<ControllerResponse> {
    return this.handleResult({});
  }
}
