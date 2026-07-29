import { z } from 'zod';

export const SocialLinkSchema = z.object({
  label: z.string().min(1).max(50),
  url: z.string().url(),
});

export const ProfileSchema = z.object({
  name: z.string().min(1).max(100),
  photoUrl: z.string().url(),
  motto: z.string().max(200).nullable(),
  description: z.string().min(1).max(2000),
  socialLinks: z.array(SocialLinkSchema).min(1),
});

export const ProjectSchema = z.object({
  title: z.string().min(1).max(100),
  description: z.string().min(1).max(500),
  thumbnailUrl: z.string().url().nullable(),
  techStack: z.array(z.string()).min(1),
  demoUrl: z.string().url().nullable(),
  repositoryUrl: z.string().url().nullable(),
  displayOrder: z.number().int().positive(),
  isFeatured: z.boolean().default(false),
});

export const ProfileSeedSchema = ProfileSchema;
export const ProjectSeedSchema = z.array(ProjectSchema);

export type SocialLinkInput = z.infer<typeof SocialLinkSchema>;
export type ProfileInput = z.infer<typeof ProfileSchema>;
export type ProjectInput = z.infer<typeof ProjectSchema>;
