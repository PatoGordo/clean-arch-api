import { Request, Response } from "express";
import { SignInUseCase } from "./sign-in.usecase";

export class ChangePasswordController {
  constructor(private useCase: SignInUseCase) {}

  async execute(req: Request, res: Response) {}
}
