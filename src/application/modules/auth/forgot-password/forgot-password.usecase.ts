import moment from "moment";
import { resetPasswordTemplate } from "../../../../resource/reset-password.template";
import { generateID } from "../../../../utils/generate-id";
import { MailTransporterAdapter } from "../../../adapters/mail/transporter";
import { AuthRepository } from "../../../repositories/auth.repository";
import { ForgotPasswordDTO } from "./forgot-password.dto";
import jwt from "jsonwebtoken";

export class ForgotPasswordUseCase {
  constructor(
    private authRepository: AuthRepository,
    private mailTransporter: MailTransporterAdapter,
  ) {}

  async execute(data: ForgotPasswordDTO) {
    const user = await this.authRepository.findUserByEmail(data);

    if (!user) {
      throw new Error("This user does not exist!");
    }

    const token = generateID(36);

    const passwordChange = await this.authRepository.createPasswordChange({
      expires_at: moment().add(1, "h").toDate(),
      is_reset_password: true,
      token,
      user,
    });

    const jwtPasswordChange = jwt.sign(
      {
        token,
      },
      String(process.env.RESET_PASSWORD_JWT_SECRET),
      {
        expiresIn: "1h",
      },
    );

    await this.mailTransporter.send({
      from: String(process.env.MAIL_USERNAME),
      to: data.email,
      body: resetPasswordTemplate(
        `http://localhost:3000/auth/reset-password?token=${jwtPasswordChange}`,
      ),
      subject: `${process.env.APP_NAME} - Reset password`,
    });
  }
}
