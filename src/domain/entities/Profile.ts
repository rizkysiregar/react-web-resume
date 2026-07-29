export interface SocialLink {
  label: string;
  url: string;
}

export interface Profile {
  id: string;
  name: string;
  photoUrl: string;
  motto: string | null;
  description: string;
  socialLinks: SocialLink[];
  createdAt: Date;
  updatedAt: Date;
}
