import type { Profile } from '@/domain/entities';

export interface ProfileRepository {
  getProfile(): Promise<Profile | null>;
}
