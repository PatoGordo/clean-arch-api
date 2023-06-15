import { Request, Response } from "express";
import { ConfirmEmailUseCase } from "./confirm-email.usecase";

export class ChangePasswordController {
  constructor(private useCase: ConfirmEmailUseCase) {}

  async execute(req: Request, res: Response) {}
}
