import {
  AuthRepository,
  ChangePasswordData,
  ConfirmEmailData,
  EndSessionData,
  FindSessionsData,
  ForgotPasswordData,
  MeData,
  ResendEmailConfirmationData,
  ResetPasswordData,
  SignInData,
  SignOutData,
  SignUpData,
} from "../../../../application/repositories/auth.repository";
import { Profile } from "../../../../domain/entities/profile";
import { User } from "../../../../domain/entities/user";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { inMemoryDB } from "../db";
import { Session } from "../../../../domain/entities/session";
import moment from "moment";
import { generateID } from "../../../../utils/generate-id";
import { profile } from "console";
import { InMemoryMailer } from "../../../mail/in-memory/adapters/in-memory-mail.adpater";

export class InMemoryAuthRepository implements AuthRepository {
  async signIn(data: SignInData): Promise<{
    token: string;
    refresh_token: string;
    user: User;
    profile: Profile;
  }> {
    const userExists = inMemoryDB.users.find(user => user.email === data.email);

    if (!userExists) {
      throw new Error("Email ou senha incorretos!");
    }

    const isPasswordTheSame = bcrypt.compareSync(
      data.password,
      userExists.password,
    );

    if (!isPasswordTheSame) {
      throw new Error("Email ou senha incorretos!");
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

    const session = new Session({
      expires_at: moment().add(1, "h").toDate(),
      last_access: moment().toDate(),
      link: generateID(64),
      token: authToken,
      user: userExists,
      user_id: userExists.id,
    });

    inMemoryDB.sessions.push(session);

    const refreshToken = jwt.sign(
      {
        link: session.link,
      },
      String(process.env.REFRESH_TOKEN_JWT_SECRET),
      {
        expiresIn: "3d",
      },
    );

    const userProfile = inMemoryDB.profiles.find(
      profile => profile.user_id === userExists.id,
    ) as Profile;

    return {
      user: userExists,
      token: authToken,
      refresh_token: refreshToken,
      profile: userProfile,
    };
  }

  async signUp(data: SignUpData): Promise<{
    token: string;
    refresh_token: string;
    user: User;
    profile: Profile;
  }> {
    const emailAlreadyUsed = inMemoryDB.users.find(
      user => user.email === data.email,
    );

    if (emailAlreadyUsed) {
      throw new Error(
        "Esse email já está em uso! Use outro ou logo com a conta desejada.",
      );
    }

    const user = new User({
      email: data.email,
      name: data.name,
      password: bcrypt.hashSync(data.password, 11),
    });

    const profile = new Profile({
      user_id: user.id,
    });

    user.profile_id = profile.id;
    user.profile = profile;
    profile.user = user;

    const authToken = jwt.sign(
      {
        user_id: user.id,
      },
      String(process.env.JWT_SECRET),
      {
        expiresIn: "1h",
      },
    );

    const session = new Session({
      expires_at: moment().add(1, "h").toDate(),
      last_access: moment().toDate(),
      link: generateID(64),
      token: authToken,
      user: user,
      user_id: user.id,
    });

    inMemoryDB.sessions.push(session);
    inMemoryDB.users.push(user);
    inMemoryDB.profiles.push(profile);

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
      profile,
      refresh_token: refreshToken,
      token: authToken,
    };
  }

  async me(data: MeData): Promise<{
    user: User;
    profile: Profile;
  }> {
    const userId = jwt.verify(data.token, String(process.env.JWT_SECRET));

    if (typeof userId === "string" || !userId) {
      throw new Error("Token de autenticação inválido!");
    }

    const session = inMemoryDB.sessions.find(
      session =>
        session.token === data.token &&
        session.user_id === (userId as { user_id: string }).user_id,
    );

    if (!session) {
      throw new Error("Esse token não está vinculado a nenhuma sessão aberta!");
    }

    const user = inMemoryDB.users.find(
      user => user.id === session.user_id,
    ) as User;

    const profile = inMemoryDB.profiles.find(
      profile => profile.user_id === user.id,
    ) as Profile;

    return {
      profile,
      user,
    };
  }

  async signOut(data: SignOutData): Promise<void> {
    const sessionIndex = inMemoryDB.sessions.findIndex(
      session => session.token === data.token,
    );
    if (sessionIndex === undefined) {
      return;
    }

    inMemoryDB.sessions.splice(sessionIndex, 1);

    return;
  }

  async endSession(data: EndSessionData): Promise<void> {
    const session = inMemoryDB.sessions.find(
      session => session.link === data.link,
    );

    const user = inMemoryDB.users.find(
      user => user.id === session?.user_id,
    ) as User;

    if (data.current_token === session?.token) {
      throw new Error(
        "Você não pode encerrar sua sessão por essa tela, faça logout para isso!",
      );
    }

    const isPasswordTheSame = bcrypt.compareSync(
      data.password_confirmation,
      user.password,
    );

    if (!isPasswordTheSame) {
      throw new Error("Senha incorreta! Verifique-a e tente novamente.");
    }

    const sessionIndex = inMemoryDB.sessions.findIndex(
      _session => _session.id === session?.id,
    );

    inMemoryDB.sessions.splice(sessionIndex, 1);

    return;
  }

  async findSessions(data: FindSessionsData): Promise<{ sessions: Session[] }> {
    const user = inMemoryDB.users.find(
      user => user.id === data.user_id,
    ) as User;

    const isPasswordTheSame = bcrypt.compareSync(
      data.password_confirmation,
      user.password,
    );

    if (!isPasswordTheSame) {
      throw new Error("Senha incorreta! Verifique-a e tente novamente.");
    }

    const sessions = inMemoryDB.sessions.filter(
      session => session.user_id === user.id,
    );

    return {
      sessions,
    };
  }

  async confirmEmail(data: ConfirmEmailData): Promise<void> {
    const isValidEmailConfirmationToken = jwt.verify(
      data.confirm_email_token,
      String(process.env.EMAIL_CONFIRMATION_JWT_SECRET),
    );

    if (typeof isValidEmailConfirmationToken === "string") {
      throw new Error("Token de confirmação de email inválido ou expirado!");
    }

    const user = inMemoryDB.users.find(
      user =>
        user.id ===
        (isValidEmailConfirmationToken as { user_id: string }).user_id,
    );

    const userIndex = inMemoryDB.users.findIndex(
      user =>
        user.id ===
        (isValidEmailConfirmationToken as { user_id: string }).user_id,
    );

    if (!user) {
      throw new Error("Usuário não existe na base!");
    }

    inMemoryDB.users[userIndex].confirmed_email = true;

    return;
  }

  async resendEmailConfirmation(
    data: ResendEmailConfirmationData,
  ): Promise<void> {
    const user = inMemoryDB.users.find(user => user.email === data.email);

    if (!user || user.confirmed_email) {
      throw new Error("Esse usuário não existe ou já teve o email confirmado!");
    }

    const mailer = new InMemoryMailer();

    const emailConfirmationToken = jwt.sign(
      { user_id: user.id },
      String(process.env.EMAIL_CONFIRMATION_JWT_SECRET),
    );

    mailer.send({
      body: emailConfirmationToken,
      from: "no-reply@in-memory.sys",
      to: user.email,
      subject: "Email confirmation",
    });

    return;
  }

  async changePassword(data: ChangePasswordData): Promise<void> {
    const user = inMemoryDB.users.find(
      user => user.id === data.user_id,
    ) as User;

    const userIndex = inMemoryDB.users.findIndex(
      user => user.id === data.user_id,
    );

    if (!bcrypt.compareSync(data.old_password, user.password)) {
      throw new Error("Senha incorreta! Verifique-a e tente novamente.");
    }

    inMemoryDB.users[userIndex].password = bcrypt.hashSync(
      data.new_password,
      11,
    );
  }

  async forgotPassword(data: ForgotPasswordData): Promise<void> {
    const user = inMemoryDB.users.find(user => user.email === data.email);

    if (!user) {
      return;
    }

    const mailer = new InMemoryMailer();

    const resetPasswordToken = jwt.sign(
      { user_id: user.id },
      "<testing_reset_password_token>",
    );

    mailer.send({
      body: resetPasswordToken,
      from: "no-reply@in-memory.sys",
      to: data.email,
      subject: "Password reset",
    });

    return;
  }

  async resetPassword(data: ResetPasswordData): Promise<void> {
    const isValidResetPasswordToken = jwt.verify(
      data.reset_password_token,
      String(process.env.RESET_PASSWORD_JWT_SECRET),
    );

    if (typeof isValidResetPasswordToken === "string") {
      throw new Error("Token de redefinição de senha inválido ou expirado!");
    }

    const userIndex = inMemoryDB.users.findIndex(
      user =>
        user.id === (isValidResetPasswordToken as { user_id: string }).user_id,
    );

    inMemoryDB.users[userIndex].password = bcrypt.hashSync(
      data.new_password,
      11,
    );
  }
}
