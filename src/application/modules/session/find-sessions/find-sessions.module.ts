import { Module } from "../../../adapters/http/module";
import { SessionRepository } from "../../../repositories/session.repository";
import { FindSessionsController } from "./find-sessions.controller";
import { FindSessionsUseCase } from "./find-sessions.usecase";

export class FindSessionsModule extends Module<SessionRepository> {
  useCase = FindSessionsUseCase;
  controller = FindSessionsController;
}
