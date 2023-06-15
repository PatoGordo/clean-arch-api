import { Request, Response } from "express";
import { ResendEmailConfirmationUseCase } from "./resend-email-confirmation.usecase";

export class ChangePasswordController {
  constructor(private useCase: ResendEmailConfirmationUseCase) {}

  async execute(req: Request, res: Response) {}
}
