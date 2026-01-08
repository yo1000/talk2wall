import {getPosts} from "@/lib/posts";
import PostList from "@/components/postList/PostList";
import CoverImage from "@/components/postList/CoverImage";

export const dynamic = 'error';
export const revalidate = false;
export const dynamicParams = false;

export default async function PostsPage() {
    return (
      <div>
        <CoverImage coverSource={"/images/cover-posts.png"} captionSource={"/images/cover-posts-caption.png"}/>
        <PostList posts={getPosts()}/>
      </div>
    );
}
