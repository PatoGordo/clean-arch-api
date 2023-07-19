import { Controller } from "./controller";
import { UseCase } from "./usecase";

export class Module<T> {
  controller?: any;
  useCase?: any;

  constructor(protected repository: T) {}

  execute(): Controller<any> {
    if (!this.useCase) {
      throw new Error("Use case ins't defined");
    }

    const useCase = new this.useCase(this.repository);

    const controller = new this.controller(useCase);

    return controller;
  }
}
