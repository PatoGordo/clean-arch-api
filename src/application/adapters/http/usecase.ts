export abstract class UseCase<T> {
  constructor(protected repository: T) {}

  abstract execute(...data: any): Promise<any>;
}
