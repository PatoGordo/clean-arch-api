import {
  CookieOptions,
  Errback,
  NextFunction,
  Request,
  Response,
} from "express";
import { HTTPResponse } from "../../../domain/http/http-response";
import { ZodError, z } from "zod";
import { IController } from "../../../application/adapters/http/controller";

export abstract class ExpressController<T> implements IController<T> {
  public context?: any;
  private req: Request | null = null;
  private res: Response | null = null;
  private next: NextFunction | null = null;
  public z = z;

  constructor(public useCase: T) {
    this.req = null;
    this.res = null;
    this.next = null;
  }

  public abstract execute(): Promise<ControllerResponse | void>;

  public nextFunction(): void {
    if (!this.next) {
      throw new Error("Next function does not exists");
    }

    this?.next();
  }

  public handler = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<ControllerResponse | void> => {
    this.req = req;
    this.res = res;
    this.next = next;

    try {
      const result = await this.execute();

      return result;
    } catch (error) {
      return this.handleError(error);
    }
  };

  public handleResult = async (
    data: Partial<HTTPResponse>,
  ): Promise<Response<Partial<HTTPResponse> & unknown>> => {
    const response = this.res?.status(data?.status_code || 200);

    if (response) {
      return response.json({ ...data });
    } else {
      throw new Error("Response object is undefined");
    }
  };

  public handleError = async (error: Error | unknown, status = 400) => {
    const err = error as HTTPResponse & ZodError & Error & { cause: any };

    console.error(err);

    const statusCode = err.status_code || 400;

    if (error instanceof z.ZodError) {
      const errors = this.formatZodErrors(error.flatten().fieldErrors);

      return this.handleResult({
        status_code: statusCode,
        message: errors[0],
        cause: err.cause,
        path: this.req?.path,
        timestamp: new Date().toISOString(),
      });
    }

    if (err?.issues?.length) {
      const formatedErr = err.format() as {
        [_errors in string]: string[] | string;
      };

      const errorText = Object.keys(formatedErr)
        .map(key =>
          key === "_errors" && formatedErr[key]?.length
            ? `Un unexpected error has occurred: ${formatedErr._errors[0]}`
            : key !== "_errors" &&
              `Error in the field '${key}': ${String(
                (formatedErr[key] as unknown as { _errors: string })._errors,
              )}`,
        )
        .filter(i => i)[0];

      return this.handleResult({
        message: errorText,
        cause: err.cause,
        status_code: statusCode,
        path: this.req?.path,
        timestamp: new Date().toISOString(),
      });
    }

    return this.handleResult({
      status_code: statusCode,
      message: err.message,
      cause: err.cause,
      path: this.req?.path,
      timestamp: new Date().toISOString(),
    });
  };

  public formatZodErrors = (errors: any) => {
    let formattedMessage = "";

    for (const field in errors) {
      (errors as unknown as any[])[field as any].forEach(
        (error: any, index: number) => {
          if (errors[field].length > 1) {
            formattedMessage += `Error in the field "${field}" in the ${
              index + 1
            }º item: ${error}\n`;
          } else {
            formattedMessage += `Error in the field "${field}": ${error}\n`;
          }
        },
      );
    }

    return formattedMessage;
  };

  public getBody = async () => {
    return this?.req?.body;
  };

  public getParams = async () => {
    return this?.req?.params;
  };

  public getHeaders = async () => {
    return this?.req?.headers;
  };

  public getStatus = async () => {
    return this.res?.statusCode;
  };

  public getHeader = async (name: string) => {
    return this.req?.headers[name];
  };

  public setHeader = async (name: string, value: string | string[]) => {
    this.res?.setHeader(name, value);
  };

  public sendResponse = async (body: any) => {
    return this.res?.send(body);
  };

  public setStatusCode(code: number): void {
    (this.res as Response).statusCode = code;
  }

  public renderView = async (
    view: string,
    options?: object | undefined,
    callback?: ((err: Error, html: string) => void) | undefined,
  ) => {
    return this.res?.render(view, options, callback);
  };

  public getStatusCode = async () => {
    return this.res?.statusCode;
  };

  public getStatusMessage = async () => {
    return this.res?.statusMessage;
  };

  public getContentType = async () => {
    return this.res?.getHeader("Content-Type");
  };

  public getCookie = async (
    name: string,
    value: string,
    options: CookieOptions,
  ) => {
    return this.res?.cookie(name, value, options);
  };

  public setCookie = async (
    name: string,
    value: string,
    options: CookieOptions,
  ) => {
    this.res?.cookie(name, value, options);
  };

  public clearCookie = async (name: string, options?: any) => {
    this.res?.clearCookie(name, options);
  };

  public redirect = async (url: string, status?: number) => {
    this.res?.redirect(status || 302, url);
  };

  public download = async (path: string, fn?: Errback | undefined) => {
    this.res?.download(path, fn);
  };

  public getContext(name?: string): void {
    if (!name) {
      return (this.req as any).context;
    }

    return (this.req as any).context[name];
  }

  public setContext(name: string, value: any): void {
    (this.req as any)["context"] = {
      ...{
        [name]: value,
      },
    };
  }
}

export type ControllerResponse =
  | Response<Partial<HTTPResponse>, Record<string, any>>
  | undefined;
