import { Module } from "../../../adapters/http/module";
import { AuthRepository } from "../../../repositories/auth.repository";
import { MeController } from "./me.controller";
import { MeUseCase } from "./me.usecase";

export class MeModule extends Module {
  useCase = MeUseCase;
  controller = MeController;
}
