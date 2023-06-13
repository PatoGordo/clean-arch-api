import { Profile } from "../../domain/entities/profile";
import { Session } from "../../domain/entities/session";
import { User } from "../../domain/entities/user";

export interface AuthRepository {
  signIn(data: SignInData): Promise<{
    token: string;
    refresh_token: string;
    user: User;
    profile: Profile;
  }>;
  signUp(data: SignUpData): Promise<{
    token: string;
    refresh_token: string;
    user: User;
    profile: Profile;
  }>;
  me(data: MeData): Promise<{
    token: string;
    refresh_token: string;
    user: User;
    profile: Profile;
  }>;
  findSessions(data: FindSessionsData): Promise<{ sessions: Session[] }>;
  signOut(data: SignOutData): Promise<void>;
  forgotPassword(data: ForgotPasswordData): Promise<void>;
  resetPassword(data: ResetPasswordData): Promise<void>;
  confirmEmail(data: ConfirmEmailData): Promise<void>;
  resendEmailConfirmation(data: ResendEmailConfirmationData): Promise<void>;
  endSession(data: EndSessionData): Promise<void>;
  changePassword(data: ChangePasswordData): Promise<void>;
}

export interface SignInData {
  email: string;
  password: string;
}

export interface SignUpData {
  name: string;
  email: string;
  password: string;
}

export interface SignOutData {
  token: string;
}

export interface MeData {
  token: string;
}

export interface ForgotPasswordData {
  email: string;
}

export interface ResetPasswordData {
  reset_password_token: string;
  new_password: string;
}

export interface ResendEmailConfirmationData {
  email: string;
}

export interface ConfirmEmailData {
  confirm_email_token: string;
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

export interface ChangePasswordData {
  user_id: string;
  old_password: string;
  new_password: string;
}
