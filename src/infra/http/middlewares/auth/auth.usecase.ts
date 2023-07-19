import { UseCase } from "../../../../application/adapters/http/usecase";
import { AuthRepository } from "../../../../application/repositories/auth.repository";
import { User } from "../../../../domain/entities/user";

import jwt from "jsonwebtoken";
import { HTTPException } from "../../../../domain/http/http-exception";

export class AuthMiddlwareUseCase extends UseCase<AuthRepository> {
  async execute(token: string): Promise<{ user: User }> {
    const tokenData = jwt.verify(
      token,
      String(process.env.BEARER_TOKEN_JWT_SECRET),
    );

    if (typeof tokenData === "string") {
      throw new HTTPException({
        message: "The sent token is invalid or already exipired!",
        status_code: 401,
      });
    }

    const user = await this.repository.findUserById({
      user_id: tokenData.user_id,
    });

    if (!user || user.status === "activated") {
      throw new HTTPException({
        message: "This user does not exists or it's restricted!",
        status_code: 401,
      });
    }

    return { user };
  }
}
