import { Request, Response } from "express";
import { SignOutUseCase } from "./sign-out.usecase";

export class ChangePasswordController {
  constructor(private useCase: SignOutUseCase) {}

  async execute(req: Request, res: Response) {}
}
