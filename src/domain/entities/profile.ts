import { randomUUID } from "crypto";
import { User } from "./user";

export const DEFAULT_PROFILE_STATUS = "private";

export class Profile {
  // Fillable Fields
  id?: string;
  bio?: string;
  photo_url?: string;
  birth_date?: Date;
  pronouns?: string;

  // Management Fields
  status?: ProfileStatusEnum;
  created_at?: Date;
  updated_at?: Date;

  // Relationships
  user?: User;
  user_id?: string;

  constructor(data: Profile) {
    // Fillable Fields
    this.id = data?.id || randomUUID();
    this.bio = data.bio || undefined;
    this.photo_url = data.photo_url || undefined;
    this.birth_date = data.birth_date || undefined;
    this.pronouns = data.pronouns || undefined;

    // Management Fields
    this.status = data?.status || DEFAULT_PROFILE_STATUS;
    this.created_at = new Date();
    this.updated_at = new Date();

    // Relationships
    this.user = data?.user || undefined;
    this.user_id = data?.user_id || undefined;
  }
}

export type ProfileStatusEnum = "private" | "public";
