import { Profile } from "../../domain/entities/profile";
import { Session } from "../../domain/entities/session";
import { User } from "../../domain/entities/user";

export interface AuthRepository {
  findUserByEmail(data: FindUserByEmailData): Promise<User | undefined>;
  findUserById(data: FindUserByIdData): Promise<User | undefined>;
  createSession(data: CreateSessionData): Promise<Session>;
  createUser(data: CreateUserData): Promise<User>;
}

export interface CreateSessionData {
  expires_at: Date;
  token: string;
  user: User;
}

export interface FindUserByEmailData {
  email: string;
}

export interface FindUserByIdData {
  user_id: string;
}

export interface CreateUserData {
  email: string;
  name: string;
  hashed_password: string;
}
