import {
  AuthRepository,
  CreateSessionData,
  CreateUserData,
  FindUserByEmailData,
  FindUserByIdData,
} from "../../../../application/repositories/auth.repository";
import { Profile } from "../../../../domain/entities/profile";
import { Session } from "../../../../domain/entities/session";
import { User } from "../../../../domain/entities/user";
import { generateID } from "../../../../utils/generate-id";
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
      link: generateID(64),
      token: data.token,
    });

    inMemoryDB.sessions.push(session);

    return session;
  }
}
