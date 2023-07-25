import { Controller } from "./controller";

export class Module {
  deps: any;
  controller?: any;
  useCase?: any;

  constructor(...deps: any) {
    this.deps = deps;
  }

  execute(): Controller<any> {
    if (!this.useCase) {
      throw new Error("Use case ins't defined");
    }

    const useCase = new this.useCase(this.deps);

    const controller = new this.controller(useCase);

    return controller;
  }
}
