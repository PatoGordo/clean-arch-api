import {
  CookieOptions,
  Errback,
  NextFunction,
  Request,
  Response,
} from "express";
import { HTTPResponse } from "../../../domain/http/http-response";
import { ZodError, z } from "zod";

export abstract class Controller<T> {
  private req: Request | null = null;
  private res: Response | null = null;
  private next: NextFunction | null = null;
  protected z = z;

  constructor(public useCase: T) {
    this.req = null;
    this.res = null;
    this.next = null;
  }

  public abstract execute(): Promise<ControllerResponse>;

  public handler = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<ControllerResponse> => {
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

  protected handleResult = async (
    data: Partial<HTTPResponse>,
  ): Promise<Response<Partial<HTTPResponse>>> => {
    const response = this.res?.status(data?.statusCode || 200);

    if (response) {
      return response.json({ ...data });
    } else {
      throw new Error("Response object is undefined");
    }
  };

  protected handleError = async (error: Error | unknown, status = 400) => {
    const err = error as HTTPResponse & ZodError & Error & { cause: any };

    console.error(err);

    const statusCode = err.statusCode || 400;

    if (error instanceof z.ZodError) {
      const errors = this.formatZodErrors(error.flatten().fieldErrors);

      return this.handleResult({
        statusCode,
        message: errors[0],
        cause: err.cause,
        code: err.code,
      });
    }

    if (err?.issues?.length) {
      const formatedErr = err.format() as {
        [_errors in string]: string[] | string;
      };

      const errorText = Object.keys(formatedErr)
        .map(key =>
          key === "_errors" && formatedErr[key]?.length
            ? `Um erro inesperado ocorreu: ${formatedErr._errors[0]}`
            : key !== "_errors" &&
              `Erro no campo '${key}': ${String(
                (formatedErr[key] as unknown as { _errors: string })._errors,
              )}`,
        )
        .filter(i => i)[0];

      return this.handleResult({
        statusCode,
        message: errorText,
        cause: err.cause,
        code: err.code,
      });
    }

    return this.handleResult({
      statusCode,
      message: err.message,
      stack: err.stack,
      cause: err.cause,
      code: err.code,
    });
  };

  protected formatZodErrors = (errors: any) => {
    let formattedMessage = "";

    for (const field in errors) {
      (errors as unknown as any[])[field as any].forEach(
        (error: any, index: number) => {
          if (errors[field].length > 1) {
            formattedMessage += `Erro no campo "${field}" no ${
              index + 1
            }º item: ${error}\n`;
          } else {
            formattedMessage += `Erro no campo "${field}": ${error}\n`;
          }
        },
      );
    }

    return formattedMessage;
  };

  protected getBody = async () => {
    return this?.req?.body;
  };

  protected getParams = async () => {
    return this?.req?.params;
  };

  protected getHeaders = async () => {
    return this?.req?.headers;
  };

  protected getStatus = async () => {
    return this.res?.statusCode;
  };

  protected getHeader = async (name: string) => {
    return this.res?.getHeader(name);
  };

  protected setHeader = async (name: string, value: string | string[]) => {
    this.res?.setHeader(name, value);
  };

  protected sendResponse = async (body: any) => {
    return this.res?.send(body);
  };

  protected renderView = async (
    view: string,
    options?: object | undefined,
    callback?: ((err: Error, html: string) => void) | undefined,
  ) => {
    return this.res?.render(view, options, callback);
  };

  protected getStatusCode = async () => {
    return this.res?.statusCode;
  };

  protected getStatusMessage = async () => {
    return this.res?.statusMessage;
  };

  protected getContentType = async () => {
    return this.res?.getHeader("Content-Type");
  };

  protected getCookie = async (
    name: string,
    value: string,
    options: CookieOptions,
  ) => {
    return this.res?.cookie(name, value, options);
  };

  protected setCookie = async (
    name: string,
    value: string,
    options: CookieOptions,
  ) => {
    this.res?.cookie(name, value, options);
  };

  protected clearCookie = async (name: string, options?: any) => {
    this.res?.clearCookie(name, options);
  };

  protected redirect = async (url: string, status?: number) => {
    this.res?.redirect(status || 302, url);
  };

  protected download = async (path: string, fn?: Errback | undefined) => {
    this.res?.download(path, fn);
  };
}

export type ControllerResponse =
  | Response<Partial<HTTPResponse>, Record<string, any>>
  | undefined;
