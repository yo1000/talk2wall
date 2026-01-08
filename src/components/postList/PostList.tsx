import {Post} from "@/lib/posts";
import styles from "./PostList.module.css"
import PostListItem from "@/components/postList/PostListItem";

export default function PostList({posts}: {posts: Post[]}) {
  return (
    <div className={styles.postList}>
      {posts
        .filter(({ meta }) => meta.tags && meta.tags.length > 0)
        .map(post => (
          <div key={post.meta.slug}>
            <PostListItem post={post}/>
          </div>
        ))
      }
    </div>
  )
}
