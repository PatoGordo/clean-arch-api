import { Controller } from "../../../../application/adapters/http/controller";
import { HTTPException } from "../../../../domain/http/http-exception";
import { AuthMiddlwareUseCase } from "./auth.usecase";

export class AuthMiddlewareController extends Controller<AuthMiddlwareUseCase> {
  async execute() {
    let headerToken =
      (await this.getHeader("Authorization")) ||
      (await this.getHeader("authorization"));

    if (!headerToken) {
      throw new HTTPException({
        message: "You should to be logged in to do this action!",
        status_code: 401,
      });
    }

    headerToken = String(headerToken);

    if (!headerToken.includes("Bearer")) {
      throw new HTTPException({
        message:
          'Header went invalid! It should to have "Bearer" in it composition!',
        status_code: 401,
      });
    }

    const token = headerToken.split("Bearer")[1].trim();

    if (!token) {
      throw new HTTPException({
        message: "You should also send the jsonwebtoken part in the header!",
        status_code: 401,
      });
    }

    const { user } = await this.useCase.execute(token);

    this.setContext("user", user);
    this.setContext("token", token);

    this.nextFunction();
  }
}
