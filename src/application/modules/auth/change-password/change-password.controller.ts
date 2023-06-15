import { Request, Response } from "express";
import { ChangePasswordUseCase } from "./change-password.usecase";

export class ChangePasswordController {
  constructor(private useCase: ChangePasswordUseCase) {}

  async execute(req: Request, res: Response) {}
}
