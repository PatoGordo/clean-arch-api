import moment from "moment";
import { UseCase } from "../../../adapters/http/usecase";
import { AuthRepository } from "../../../repositories/auth.repository";
import { SignUpDTO } from "./sign-up.dto";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export class SignUpUseCase extends UseCase<AuthRepository> {
  async execute(data: SignUpDTO) {
    const emailAlreadyUsed = await this.repository.findUserByEmail({
      email: data.email,
    });

    if (emailAlreadyUsed) {
      throw new Error("This email is already used in an account!");
    }

    const hashedPassword = bcrypt.hashSync(data.password, 12);

    const user = await this.repository.createUser({
      name: data.name,
      email: data.email,
      hashed_password: hashedPassword,
    });

    const authToken = jwt.sign(
      {
        user_id: user.id,
      },
      String(process.env.JWT_SECRET),
      {
        expiresIn: "1h",
      },
    );

    const session = await this.repository.createSession({
      expires_at: moment().add(1, "h").toDate(),
      token: authToken,
      user: user,
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
      user,
      token: authToken,
      refresh_token: refreshToken,
    };
  }
}
