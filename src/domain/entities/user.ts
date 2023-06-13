import { randomUUID } from "crypto";
import { Profile } from "./profile";
import { Session } from "./session";

export const DEFAULT_USER_STATUS = "pendinng_email_confirmation";
export const DEFAULT_USER_ROLE = "user";

export class User {
  // Fillable Fields
  id?: string;
  email: string;
  password: string;
  name: string;

  // Management Fields
  status?: UserStatuEnum;
  role?: UserRoleEnum;
  created_at?: Date;
  updated_at?: Date;

  // Relationships
  sessions?: Session[];
  profile?: Profile;
  profile_id?: string;

  constructor(data: User) {
    // Fillable Fields
    this.id = data?.id || randomUUID();
    this.email = data.email;
    this.password = data.password;
    this.name = data.name;

    // Management Fields
    this.status = data?.status || DEFAULT_USER_STATUS;
    this.role = data?.role || DEFAULT_USER_ROLE;
    this.created_at = new Date();
    this.updated_at = new Date();

    // Relationships
    this.sessions = data?.sessions || [];
  }
}

export type UserStatuEnum =
  | "pendinng_email_confirmation"
  | "activated"
  | "unactivated"
  | "deleted"
  | "revision";

export type UserRoleEnum = "user" | "editor" | "admin";
