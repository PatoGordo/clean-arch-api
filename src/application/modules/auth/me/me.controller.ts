import { Request, Response } from "express";
import { MeUseCase } from "./me.usecase";

export class ChangePasswordController {
  constructor(private useCase: MeUseCase) {}

  async execute(req: Request, res: Response) {}
}
