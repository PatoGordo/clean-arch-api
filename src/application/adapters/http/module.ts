import { Controller } from "./controller";

export abstract class Module<T> {
  constructor(protected repository: T) {}

  abstract execute(): Controller<any>;
}
