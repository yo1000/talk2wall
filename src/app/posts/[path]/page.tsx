import {getPosts} from "@/lib/posts";
import {copyAssets, extractAssets} from "@/lib/copyAssets";
import paths from "node:path";
import Sidebar from "@/components/post/Sidebar";
import PostContent from "@/components/post/PostContent";
import styles from "./page.module.css";
import {notFound} from "next/navigation";

export const dynamic = 'error';
export const revalidate = false;
export const dynamicParams = false;

export async function generateStaticParams() {
  return getPosts()
    .map(p => ({path: p.meta.path?.replace(/^\//, "")}));
}

export async function generateMetadata({ params }: { params: Promise<{ path: string }> }) {
  const { path } = await params;
  const post = getPosts().find(p => p.meta.path?.replace(/^\//, "") === path);

  return {
    title: `${post?.meta?.title} | talk2wall`,
  };
}

export default async function PostsPathPage({ params }: { params: Promise<{ path: string }> }) {
  const { path } = await params;
  const post = getPosts().find(p => p.meta.path?.replace(/^\//, "") === path);

  if (!post) return notFound();

  const assets = extractAssets(post.content.origin);
  for (const asset of assets) {
    copyAssets({
      absSrcDir: paths.dirname(post.meta.absolutePath),
      relDestDir: path,
      imagePath: asset,
    });
  }

  return (
    <div className={styles.split}>
      <PostContent title={post?.meta?.title ?? ""}>
        <div dangerouslySetInnerHTML={{__html: post?.content?.html ?? ""}}></div>
      </PostContent>
      <Sidebar meta={post.meta}/>
    </div>
  );
}
