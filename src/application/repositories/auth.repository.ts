import { PasswordChange } from "../../domain/entities/password-change";
import { Profile } from "../../domain/entities/profile";
import { Session } from "../../domain/entities/session";
import { User } from "../../domain/entities/user";

export interface AuthRepository {
  findUserByEmail(data: FindUserByEmailData): Promise<User | undefined>;
  findUserById(data: FindUserByIdData): Promise<User | undefined>;
  createSession(data: CreateSessionData): Promise<Session>;
  deleteSession(data: DeleteSessionData): Promise<void>;
  createUser(data: CreateUserData): Promise<User>;
  createPasswordChange(
    data: CreatePasswordChangeData,
  ): Promise<PasswordChange | undefined>;
}

export interface CreatePasswordChangeData {
  expires_at: Date;
  token: string;
  is_reset_password: boolean;
  user: User;
}

export interface CreateSessionData {
  expires_at: Date;
  token: string;
  user: User;
  link: string;
}

export interface DeleteSessionData {
  token: string;
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
