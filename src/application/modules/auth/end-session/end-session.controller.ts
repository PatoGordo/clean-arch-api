import { Request, Response } from "express";
import { EndSessionUseCase } from "./end-session.usecase";

export class ChangePasswordController {
  constructor(private useCase: EndSessionUseCase) {}

  async execute(req: Request, res: Response) {}
}
