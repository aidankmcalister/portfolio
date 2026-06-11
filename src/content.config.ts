import { defineCollection } from "astro:content";
import { glob } from "astro/loaders";
import { z } from "astro:schema";

const blog = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./src/content/blog" }),
  schema: z.object({
    title: z.string(),
    slug: z.string(),
    date: z.string(),
    description: z.string().default(""),
    draft: z.boolean().default(false),
    external: z.boolean().default(false),
    link: z.string().optional(),
  }),
});

export const collections = { blog };
