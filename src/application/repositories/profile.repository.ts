import { Profile } from "../../domain/entities/profile";

export interface ProfileRepository {
  updateProfile(data: UpdateProfileData): Promise<void>;
  findProfile(data: FindProfileData): Promise<void>;
}

export interface UpdateProfileData {
  user_id: string;
  data: Partial<Profile>;
}

export interface FindProfileData {
  user_id: string;
}
