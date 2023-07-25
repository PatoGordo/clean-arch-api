import { PasswordChange } from "../../../domain/entities/password-change";
import { Profile } from "../../../domain/entities/profile";
import { Session } from "../../../domain/entities/session";
import { User } from "../../../domain/entities/user";

export type InMemoryDB = {
  users: User[];
  profiles: Profile[];
  sessions: Session[];
  password_changes: PasswordChange[];
};

export let inMemoryDB: InMemoryDB = {
  users: [],
  profiles: [],
  sessions: [],
  password_changes: [],
};

export const resetInMemoryDB = () => {
  inMemoryDB = {
    users: [],
    profiles: [],
    sessions: [],
    password_changes: [],
  };
};
