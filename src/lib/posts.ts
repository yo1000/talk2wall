import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import DOMPurify from "isomorphic-dompurify";
import { JSDOM } from "jsdom";

import {marked} from "marked";
import { markedHighlight } from "marked-highlight";
import { gfmHeadingId } from 'marked-gfm-heading-id';
import markedFootnote from 'marked-footnote';

import Prism from "@/lib/prism";

const CONTENT_DIR = path.join(process.cwd(), "content", "posts");

export type PostMeta = {
    slug: string; // year/filename (exclude ext)
    title: string;
    path?: string;
    created?: Date;
    createdAsFixedLength(delimiter?: string): string | undefined;
    author?: string;
    tags?: string[];
    redirectFrom?: string[];
    absolutePath: string;
    excerpt: string;
    toc: string;
};

export type PostContent = {
    origin: string;
    html: string;
    plain: string;
};

export type Post = {
    meta: PostMeta;
    content: PostContent;
};

marked.use(gfmHeadingId({
    prefix: ''
}));

marked.use(markedHighlight({
    langPrefix: 'language-',
    highlight(code, lang) {
        const language =
          Prism.languages[lang as keyof typeof Prism.languages] ?? Prism.languages.markup;
        return Prism.highlight(code, language, lang);
    },
}));

marked.use(markedFootnote({
    refMarkers: true,
    footnoteDivider: true,
}))

function getAllPostFilepaths(): string[] {
    const years = fs.readdirSync(CONTENT_DIR);
    return years.flatMap((year) => {
        const dir = path.join(CONTENT_DIR, year);
        return fs.readdirSync(dir)
            .filter(f => f.match(/\.mdx?$/))
            .map(f => path.join(dir, f));
    });
}

function getPostByFilepath(filePath: string): Post {
    const relPath = path.relative(CONTENT_DIR, filePath);
    const slug = relPath.replace(/\.mdx?$/, "");

    const raw = fs.readFileSync(filePath, "utf8");
    const { data, content } = matter(raw);

    const html = DOMPurify.sanitize(marked.parse(content) as string);
    const dom = new JSDOM(html);
    const plain = dom.window.document.body.textContent;

    const doc = dom.window.document;
    const headings = doc.querySelectorAll("h1, h2");
    let tocMd = "";
    for (const heading of headings) {
        const idAttr = heading.getAttribute("id");
        const text = heading.textContent;
        tocMd += `- [${text}](#${idAttr})\n`;
    }

    return {
        meta: {
            slug: slug,
            title: data.title ?? path.basename(slug),
            path: (data.path ?? slug).replace(/^\//, ""),
            created: data.created ? new Date(data.created) : undefined,
            createdAsFixedLength(delimiter = "."): string | undefined {
                if (!this.created) return undefined;

                const year = `0000${this.created?.getFullYear()}`.slice(-4);
                const month = `00${this.created?.getMonth() + 1}`.slice(-2);
                const date = `00${this.created?.getDate()}`.slice(-2);

                return `${year}${delimiter}${month}${delimiter}${date}`;
            },
            author: data.author ?? undefined,
            tags: Array.isArray(data.tags)
                ? data.tags.map(tag => tag.toLowerCase().replace(/\s+/, "-"))
                : (data.tags ? [data.tags.toLowerCase()] : []),
            redirectFrom: Array.isArray(data.redirect_from)
                ? data.redirect_from
                : (data.redirect_from ? [data.redirect_from] : []),
            absolutePath: filePath,
            excerpt: plain.replace(/[\s\u3000]+/g, "").slice(0, 400),
            toc: DOMPurify.sanitize(marked.parse(tocMd) as string),
        },
        content: {
            origin: content,
            html: html,
            plain: plain,
        },
    };
}

const allPosts: Post[] = getAllPostFilepaths()
  .map(filePath => getPostByFilepath(filePath))
  .sort((a, b) => !a.meta?.created ? 1 : !b.meta?.created ? -1
    : a.meta?.created < b.meta?.created ? 1 : -1);

export function getPosts(includeTag?: string): Post[] {
  if (includeTag) {
    return allPosts
      .filter(({ meta }) => includeTag ? meta.tags?.includes(includeTag) : true);
  } else {
    return allPosts;
  }
}
