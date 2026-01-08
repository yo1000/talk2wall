import {getPosts} from "@/lib/posts";
import CoverImage from "@/components/postList/CoverImage";
import PostList from "@/components/postList/PostList";
import {countTags} from "@/lib/countTags";

export const dynamic = 'error';
export const revalidate = false;
export const dynamicParams = false;

export async function generateStaticParams() {
    return countTags;
}

export default async function ({ params }: { params: Promise<{ tag: string }> }) {
    const { tag } = await params;
    const posts = getPosts(tag);
    let index = 0;
    for (let i = 0; i < tag.length; i++) {
      index ^= tag.charCodeAt(i);
    }
    index %= 14;

    return (
      <div>
          <CoverImage coverSource={`/images/cover-tag-${index}.png`} captionText={tag}/>
          <PostList posts={posts}/>
      </div>
    );
}
