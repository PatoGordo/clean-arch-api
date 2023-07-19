import { Session } from "../../domain/entities/session";

export interface SessionRepository {
  findSessions(data: FindSessionsData): Promise<{ sessions: Session[] }>;
  endSession(data: EndSessionData): Promise<void>;
}

export interface FindSessionsData {
  user_id: string;
  password_confirmation: string;
}

export interface EndSessionData {
  link: string;
  password_confirmation: string;
  current_token: string;
}
