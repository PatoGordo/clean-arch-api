import { Request, Response } from "express";
import { FindSessionsUseCase } from "../find-sessions/find-sessions.usecase";

export class ChangePasswordController {
  constructor(private useCase: FindSessionsUseCase) {}

  async execute(req: Request, res: Response) {}
}
