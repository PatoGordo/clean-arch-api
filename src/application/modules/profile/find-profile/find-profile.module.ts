import { Module } from "../../../adapters/http/module";
import { SessionRepository } from "../../../repositories/session.repository";
import { FindProfileController } from "./find-profile.controller";
import { FindProfileUseCase } from "./find-profile.usecase";

export class FindProfileModule extends Module<SessionRepository> {
  useCase = FindProfileUseCase;
  controller = FindProfileController;
}
