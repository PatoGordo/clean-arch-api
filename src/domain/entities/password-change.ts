import { randomUUID } from "crypto";
import { User } from "./user";

export class PasswordChange {
  // Fillable Fields
  id?: string;
  token: string;
  old_password: string;
  new_password?: string;
  is_reset_password: boolean;
  expires_at: Date;
  status: PasswordChangeStatusEnum;

  // Management Fields
  created_at?: Date;
  updated_at?: Date;

  // Relationships
  user_id?: string;
  user?: User;

  constructor(data: PasswordChange) {
    // Fillable Fields
    this.id = data?.id || randomUUID();
    this.token = data.token;
    this.old_password = data.old_password;
    this.new_password = data.new_password;
    this.is_reset_password = data.is_reset_password || false;
    this.expires_at = data.expires_at;
    this.status = data.status || "not_executed";

    // Management Fields
    this.created_at = new Date();
    this.updated_at = new Date();

    // Relationships
    this.user = data?.user || undefined;
    this.user_id = data.user_id || undefined;
  }
}

export type PasswordChangeStatusEnum = "executed" | "not_executed";
