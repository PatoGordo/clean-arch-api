import { Module } from "../../../adapters/http/module";
import { FindProfileController } from "./find-profile.controller";
import { FindProfileUseCase } from "./find-profile.usecase";

export class FindProfileModule extends Module {
  useCase = FindProfileUseCase;
  controller = FindProfileController;
}
