import { Request, Response } from "express";
import { SignUpUseCase } from "./sign-up.usecase";

export class ChangePasswordController {
  constructor(private useCase: SignUpUseCase) {}

  async execute(req: Request, res: Response) {}
}
