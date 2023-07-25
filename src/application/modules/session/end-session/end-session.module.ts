import { Module } from "../../../adapters/http/module";
import { SessionRepository } from "../../../repositories/session.repository";
import { EndSessionController } from "./end-session.controller";
import { EndSessionUseCase } from "./end-session.usecase";

export class EndSessionModule extends Module {
  useCase = EndSessionUseCase;
  controller = EndSessionController;
}
