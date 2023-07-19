import { Module } from "../../../adapters/http/module";
import { SessionRepository } from "../../../repositories/session.repository";
import { UpdateProfileController } from "./update-profile.controller";
import { UpdateProfileUseCase } from "./update-profile.usecase";

export class UpdateProfileModule extends Module<SessionRepository> {
  useCase = UpdateProfileUseCase;
  controller = UpdateProfileController;
}
