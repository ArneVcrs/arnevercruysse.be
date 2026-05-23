import { defineCollection, defineConfig } from "@content-collections/core";
import { z } from "zod";
import { marked } from "marked";

const blogPosts = defineCollection({
    name: 'blogPosts',
    directory: "src/content/blog",
    include: ["**/*.md", "!**/blogpost-template.md"],
    schema: z.object({
        title: z.string(),
        date: z.string(),
        thumbnail: z.string(),
        excerpt: z.string(),
        isPublished: z.boolean().default(false),
        tags: z.array(z.string()).default([]),
        content: z.string(),
    }),
    transform: async (post) => {
        const wordsPerMinute = 225;
        const noOfWords = post.content.split(/\s/g).length;
        const minutes = Math.ceil(noOfWords / wordsPerMinute);
        
        const html = await marked.parse(post.content);
        
        return {
            ...post,
            html,
            readingTime: `${minutes} minute read`,
            slug: post._meta.path,
        };
    },
});

export default defineConfig({
    content: [blogPosts],
});
