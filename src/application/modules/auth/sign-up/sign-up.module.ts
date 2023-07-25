import { Module } from "../../../adapters/http/module";
import { SignUpController } from "./sign-up.controller";
import { SignUpUseCase } from "./sign-up.usecase";

export class SignUpModule extends Module {
  useCase = SignUpUseCase;
  controller = SignUpController;
}
