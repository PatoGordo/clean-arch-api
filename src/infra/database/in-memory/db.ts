import { Profile } from "../../../domain/entities/profile";
import { Session } from "../../../domain/entities/session";
import { User } from "../../../domain/entities/user";

export type InMemoryDB = {
  users: User[];
  profiles: Profile[];
  sessions: Session[];
};

export let inMemoryDB: InMemoryDB = {
  users: [],
  profiles: [],
  sessions: [],
};

export const resetInMemoryDB = () => {
  inMemoryDB = {
    users: [],
    profiles: [],
    sessions: [],
  };
};
