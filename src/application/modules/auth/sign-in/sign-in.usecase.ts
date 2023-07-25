import moment from "moment";
import { UseCase } from "../../../adapters/http/usecase";
import { AuthRepository } from "../../../repositories/auth.repository";
import { SignInDTO } from "./sign-in.dto";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export class SignInUseCase extends UseCase<AuthRepository> {
  async execute(data: SignInDTO) {
    const userExists = await this.repository.findUserByEmail({
      email: data.email,
    });

    if (!userExists) {
      throw new Error("Email or password went wrong!");
    }

    const isPasswordTheSame = bcrypt.compareSync(
      data.password,
      userExists.password,
    );

    if (!isPasswordTheSame) {
      throw new Error("Email or password went wrong!");
    }

    const authToken = jwt.sign(
      {
        user_id: userExists.id,
      },
      String(process.env.JWT_SECRET),
      {
        expiresIn: "1h",
      },
    );

    const session = await this.repository.createSession({
      expires_at: moment().add(1, "h").toDate(),
      token: authToken,
      user: userExists,
    });

    const refreshToken = jwt.sign(
      {
        link: session.link,
      },
      String(process.env.REFRESH_TOKEN_JWT_SECRET),
      {
        expiresIn: "3d",
      },
    );

    return {
      user: userExists,
      token: authToken,
      refresh_token: refreshToken,
    };
  }
}
