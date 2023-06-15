import { Request, Response } from "express";
import { ForgotPasswordUseCase } from "./forgot-password.usecase";

export class ChangePasswordController {
  constructor(private useCase: ForgotPasswordUseCase) {}

  async execute(req: Request, res: Response) {}
}
