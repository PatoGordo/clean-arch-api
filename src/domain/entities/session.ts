import { randomUUID } from "crypto";
import { User } from "./user";

export const DEFAULT_DEVICE_VALUE = "Desconhecido";
export const DEFAULT_LOCATION_VALUE = "Desconhecida";

export class Session {
  // Fillable Fields
  id?: string;
  token: string;
  link: string;
  device?: string;
  location?: string;
  expires_at: Date;
  last_access: Date;

  // Management Fields
  created_at?: Date;
  updated_at?: Date;

  // Relationships
  user_id?: string;
  user?: User;

  constructor(data: Session) {
    // Fillable Fields
    this.id = data?.id || randomUUID();
    this.token = data.token;
    this.link = data.link;
    this.device = data?.device || DEFAULT_DEVICE_VALUE;
    this.location = data?.location || DEFAULT_LOCATION_VALUE;
    this.expires_at = data.expires_at;
    this.last_access = data.last_access;

    // Management Fields
    this.created_at = new Date();
    this.updated_at = new Date();

    // Relationships
    this.user = data?.user || undefined;
    this.user_id = data.user_id || undefined;
  }
}
