import { defineCollection } from "astro:content";
import { glob } from "astro/loaders";
import { z } from "astro/zod";

const projects = defineCollection({
  loader: glob({ pattern: "*.md", base: "./src/content/projects" }),
  schema: z.object({
    title: z.string(),
    // One short line.
    summary: z.string(),
    href: z.string(),
    featured: z.boolean().default(false),
    order: z.number(),
  }),
});

const blog = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./src/content/blog" }),
  schema: z.object({
    title: z.string(),
    slug: z.string(),
    date: z.string(),
    description: z.string().default(""),
    // Shown after the title in lists, e.g. "with Mike Hartington".
    byline: z.string().optional(),
    draft: z.boolean().default(false),
    external: z.boolean().default(false),
    link: z.string().optional(),
  }),
});

export const collections = { projects, blog };
