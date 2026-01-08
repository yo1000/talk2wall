import path from "node:path";
import kuromoji from "kuromoji";
import MiniSearch from "minisearch";
import {getPosts} from "@/lib/posts";
import {revision} from "@/lib/revision";

export const dynamic = "force-static";
export const revalidate = false;

const DIC_DIR = path.join(process.cwd(), "node_modules", "kuromoji", "dict");

function buildTokenizer() {
  return new Promise<kuromoji.Tokenizer<kuromoji.IpadicFeatures>>((resolve, reject) => {
    kuromoji.builder({ dicPath: DIC_DIR }).build((err, tokenizer) => {
      if (err) reject(err);
      else resolve(tokenizer);
    });
  });
}

function createJapaneseTokenize(tokenizer: kuromoji.Tokenizer<kuromoji.IpadicFeatures>) {
  return (text: string) => {
    if (!text) return [];
    const tokens = tokenizer.tokenize(String(text));
    return tokens
      .map((t) => t.surface_form)
      .filter((s) => s && s.trim().length > 0)
      .filter((s) => !/^\p{P}+$/u.test(s));
  };
}

export async function generateStaticParams() {
  return [{ rev: revision }];
}

export async function GET(request: Request, { params }: { params: Promise<{ rev: String }> }
) {
  const tokenizer = await buildTokenizer();
  const tokenizeJa = createJapaneseTokenize(tokenizer);

  const miniSearch = new MiniSearch({
    fields: ["title", "tags", "plainText"],
    storeFields: ["title", "path"],
    tokenize: tokenizeJa,
    searchOptions: {
      prefix: true,
      boost: {
        title: 3,
        tags: 2,
        plainText: 1,
      },
    },
  });

  miniSearch.addAll(
    getPosts().map((post) => ({
      id: post.meta.path,
      title: post.meta.title,
      path: post.meta.path,
      tags: post.meta.tags?.join(" "),
      plainText: post.content.plain,
    }))
  );

  const payload = {
    version: 1,
    builtAt: new Date().toISOString(),
    index: JSON.stringify(miniSearch.toJSON()),
  };

  return Response.json(payload, {
    headers: {
      "Cache-Control": "public, max-age=31536000, immutable",
    },
  });
}
