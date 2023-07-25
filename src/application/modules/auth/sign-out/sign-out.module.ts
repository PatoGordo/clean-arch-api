import { Module } from "../../../adapters/http/module";
import { AuthRepository } from "../../../repositories/auth.repository";
import { SignOutController } from "./sign-out.controller";
import { SignOutUseCase } from "./sign-out.usecase";

export class SignOutModule extends Module {
  useCase = SignOutUseCase;
  controller = SignOutController;
}
