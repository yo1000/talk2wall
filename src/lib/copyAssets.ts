import fs from "node:fs";
import path from "node:path";

export function copyAssets(options: {
  absSrcDir: string;     // /home/xyz/repo/content/2025
  relDestDir: string;    // /posts/article-name
  imagePath: string;  // ./image-name.png
}) {
  const { absSrcDir, relDestDir, imagePath } = options;

  const srcAbs = path.normalize(path.join(absSrcDir, imagePath));
  const destBase = path.join(process.cwd(), "public/posts");
  const destAbs = path.normalize(path.join(destBase, relDestDir, imagePath));

  const safeBase = destBase + path.sep;
  if (!destAbs.startsWith(safeBase)) {
    throw new Error(`dest escapes public root: ${destAbs}`);
  }

  if (!fs.existsSync(srcAbs)) {
    return;
  }

  fs.mkdirSync(path.dirname(destAbs), { recursive: true });
  fs.copyFileSync(srcAbs, destAbs);
}

export function extractAssets(src: string): string[] {
  const patterns: RegExp[] = [
    // ![alt](path "title")
    /!\[[^\]]*?\]\(([^)\s'"]+)(?:\s+["'][^"']*["'])?\)/g,
    // HTML <img src="...">
    /<img[^>]*\ssrc=["']([^"']+)["'][^>]*>/gi,
    // src/href="...”
    /\b(?:src|href)=["']([^"']+)["']/gi,
    // CSS url("...") / url('...') / url(...)
    /url\(\s*(?:"([^"]+)"|'([^']+)'|([^)"']+))\s*\)/gi,
  ];

  const out: string[] = [];
  const seen = new Set<string>();

  const push = (raw?: string) => {
    if (!raw) return;
    let s = raw.trim();
    if (!s) return;

    if (/^[a-z]+:\/\//i.test(s)) return;  // http:, https:, data:, etc.
    if (/^\/\//.test(s)) return;          // protocol-relative
    if (s.startsWith("/")) return;        // root absolute (/images/a.png)

    const i = s.search(/[?#]/);
    if (i >= 0) s = s.slice(0, i);

    if (!seen.has(s)) {
      seen.add(s);
      out.push(s);
    }
  };

  for (const re of patterns) {
    re.lastIndex = 0;
    let m: RegExpExecArray | null;
    while ((m = re.exec(src)) !== null) {
      push(m[1] || m[2] || m[3] || m[0]);
    }
  }

  return out;
}
