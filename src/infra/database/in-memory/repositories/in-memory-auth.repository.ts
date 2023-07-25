import {
  AuthRepository,
  CreatePasswordChangeData,
  CreateSessionData,
  CreateUserData,
  DeleteSessionData,
  FindUserByEmailData,
  FindUserByIdData,
} from "../../../../application/repositories/auth.repository";
import { PasswordChange } from "../../../../domain/entities/password-change";
import { Profile } from "../../../../domain/entities/profile";
import { Session } from "../../../../domain/entities/session";
import { User } from "../../../../domain/entities/user";

import { inMemoryDB } from "../db";

export class InMemoryAuthRepository implements AuthRepository {
  async createUser(data: CreateUserData): Promise<User> {
    const user = new User({
      email: data.email,
      name: data.name,
      password: data.hashed_password,
    });

    const profile = new Profile({
      user_id: user.id,
      user: user,
    });

    user.profile = profile;
    user.profile_id = profile.id;

    inMemoryDB.profiles.push(profile);
    inMemoryDB.users.push(user);

    return user;
  }

  async findUserByEmail(data: FindUserByEmailData): Promise<User | undefined> {
    const user = inMemoryDB.users.find(user => user.email === data.email);

    return user;
  }

  async findUserById(data: FindUserByIdData): Promise<User | undefined> {
    const user = inMemoryDB.users.find(user => user.id === data.user_id);

    return user;
  }

  async createSession(data: CreateSessionData): Promise<Session> {
    const session = new Session({
      expires_at: data.expires_at,
      user: data.user,
      user_id: data.user.id,
      last_access: new Date(),
      link: data.link,
      token: data.token,
    });

    inMemoryDB.sessions.push(session);

    return session;
  }

  async deleteSession(data: DeleteSessionData): Promise<void> {
    const index = inMemoryDB.sessions.findIndex(s => s.token === data.token);

    inMemoryDB.sessions.splice(index, 1);
  }

  async createPasswordChange(
    data: CreatePasswordChangeData,
  ): Promise<PasswordChange | undefined> {
    const passwordChange = new PasswordChange({
      expires_at: data.expires_at,
      is_reset_password: data.is_reset_password,
      token: data.token,
      old_password: data.user.password,
      status: "not_executed",
      user: data.user,
      user_id: data.user.id,
    });

    inMemoryDB.password_changes.push(passwordChange);

    return passwordChange;
  }
}
