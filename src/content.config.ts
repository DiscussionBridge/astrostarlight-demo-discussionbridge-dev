import { defineCollection, z } from "astro:content";
import { glob } from "astro/loaders";
import { docsLoader } from "@astrojs/starlight/loaders";
import { docsSchema } from "@astrojs/starlight/schema";

const companionTopicFields = z.object({
  authors: z
    .union([
      z.object({
        id: z.string().min(1).max(255),
        name: z.string().min(1).max(200),
        profileUrl: z.string().url().optional(),
      }),
      z.array(
        z.object({
          id: z.string().min(1).max(255),
          name: z.string().min(1).max(200),
          profileUrl: z.string().url().optional(),
        }),
      ).min(1).max(20),
    ])
    .optional(),
  primaryAuthor: z.string().min(1).max(255).optional(),
  discussionbridgeExternalId: z.string().regex(/^astro-page:[0-9a-f]{64}$/).optional(),
  discussionbridgeResourceId: z.string().uuid().optional(),
  discussionbridgeNativePublication: z.boolean().optional(),
  discussionbridgeSourceRevision: z.string().regex(/^post:[1-9][0-9]*:version:[1-9][0-9]*$/).optional(),
  discourseTopicId: z.union([z.string(), z.number()]).optional(),
  discourseTopicUrl: z.string().url().optional(),
  discussionCommentsDisplay: z.enum(["simple", "full", "fullInteractive"]).optional(),
  discussionSourceAuthorUsername: z.string().optional(),
  discussionSourceAuthorName: z.string().optional(),
  discussionSourceCategoryId: z.number().int().positive().optional(),
  discussionSourceMode: z
    .enum(["astro-managed", "discourse-managed", "discourse-imported"])
    .optional(),
  discussionSync: z.boolean().optional(),
  discussionFromDiscourse: z.boolean().optional(),
  discussionListed: z.boolean().optional(),
  discussionUnlisted: z.boolean().optional(),
});

const lanePostSchema = companionTopicFields.extend({
  title: z.string(),
  description: z.string(),
  date: z.coerce.date(),
});

export const collections = {
  docs: defineCollection({
    loader: docsLoader(),
    schema: docsSchema({
      extend: companionTopicFields.extend({
        discussionProvider: z.string().optional(),
        discussionId: z.union([z.string(), z.number()]).optional(),
        discussionUrl: z.string().url().optional(),
      }),
    }),
  }),
  releases: defineCollection({
    loader: glob({ base: "./src/content/releases", pattern: "**/*.md" }),
    schema: lanePostSchema.extend({
      versionNumber: z.string(),
    }),
  }),
  blog: defineCollection({
    loader: glob({ base: "./src/content/blog", pattern: "**/*.md" }),
    schema: lanePostSchema,
  }),
  news: defineCollection({
    loader: glob({ base: "./src/content/news", pattern: "**/*.md" }),
    schema: lanePostSchema,
  }),
  comments: defineCollection({
    loader: glob({ base: "./src/content/comments", pattern: "**/*.md" }),
    schema: lanePostSchema,
  }),
};
