import { HTTPResponse } from "../../../domain/http/http-response";
import { ExpressController } from "../../../infra/http/adapters/express-controller";

export type IController<T> = {
  context?: any;
  handleResult(data: Partial<HTTPResponse>): Promise<any>;
  handleError(error: Error | unknown, status?: number): Promise<any>;
  formatZodErrors(errors: any): string;
  getBody<Y>(): Promise<Y | any>;
  getParams<Y>(): Promise<Y | any>;
  getHeaders<Y>(): Promise<Y | any>;
  getStatus(): Promise<number | undefined>;
  getHeader(name: string): Promise<any>;
  setHeader(name: string, value: string): Promise<void>;
  sendResponse(body: any): Promise<any>;
  renderView(
    view: string,
    options: object | undefined,
    callback?: ((err: Error, html: string) => void) | undefined,
  ): Promise<any>;
  getStatusCode(): Promise<number | undefined>;
  getStatusMessage(): Promise<string | undefined>;
  getContentType(): Promise<any>;
  getCookie(name: string, value: string, options: any): Promise<any>;
  setCookie(name: string, value: string, options: any): Promise<void>;
  setStatusCode(code: number): void;
  clearCookie(name: string, options: any): Promise<void>;
  redirect(url: string, status: number): Promise<void>;
  download(path: string, fn: any): Promise<void>;
  nextFunction(): void;
  setContext(name: string, value: any): void;
  getContext(name?: string): void;
};

/*
It seems to be coupled with express but it didn't, 
bacause I can implement another Controller class
using other HTTP framework like fastify, and
i still dont need to change my application layer.
*/

export abstract class Controller<T> extends ExpressController<T> {}
