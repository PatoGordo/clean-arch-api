import moment from "moment";

import { AuthRepository } from "../../../repositories/auth.repository";
import { SignInDTO } from "./sign-in.dto";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { generateID } from "../../../../utils/generate-id";

export class SignInUseCase {
  constructor(private authRepository: AuthRepository) {}

  async execute(data: SignInDTO) {
    const userExists = await this.authRepository.findUserByEmail({
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

    const link = generateID(64);

    const session = await this.authRepository.createSession({
      expires_at: moment().add(1, "h").toDate(),
      token: authToken,
      user: userExists,
      link,
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
