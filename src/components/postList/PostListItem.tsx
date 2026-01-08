import {Post} from "@/lib/posts";
import styles from "./PostListItem.module.css"
import {hiddenTags} from "@/lib/hiddenTags";

export default function PostListItem({post}: {post: Post}) {
  return (
    <div className={styles.postListItem}>
      <div className={styles.body}>
        <div className={styles.text}>
          <h2><a href={`/posts/${post.meta.path}`}>{post.meta.title}</a></h2>
          <a href={`/posts/${post.meta.path}`}>{post.meta.excerpt}</a>
        </div>
      </div>
      <div className={styles.extra}>
        {
          post.meta.tags ? (
            <ul className={styles.tags}>
              {post.meta.tags
                .filter(tag => !hiddenTags.includes(tag))
                .map(t => (
                  <li key={t}><a href={`/tags/${t}`}>{t}</a></li>
                ))
              }
            </ul>
          ) : <></>
        }
        <span className={styles.date}>{post.meta.createdAsFixedLength() ?? ""}</span>
      </div>
    </div>
  )
}
