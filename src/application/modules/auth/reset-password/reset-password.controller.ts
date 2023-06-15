import { Request, Response } from "express";
import { ResetPasswordUseCase } from "./reset-password.usecase";

export class ChangePasswordController {
  constructor(private useCase: ResetPasswordUseCase) {}

  async execute(req: Request, res: Response) {}
}
