import {PostMeta} from "@/lib/posts";
import styles from "./Sidebar.module.css";
import {hiddenTags} from "@/lib/hiddenTags";

export default function Sidebar(
  {meta}: {meta: PostMeta}
) {
  return (
    <section className={styles.Sidebar}>
      <nav className={styles.toc}>
        <div dangerouslySetInnerHTML={{__html: meta.toc}}></div>
      </nav>
      <div className={styles.meta}>
        {meta.tags ? (
          <div className={styles.tags}>
            <ul>
              {meta.tags
                .filter(tag => !hiddenTags.includes(tag))
                .map(tag => (
                  <li key={tag}><a href={`/tags/${tag}`}>{tag}</a></li>
                ))
              }
            </ul>
          </div>
        ) : <></>}
        {meta.created ? (
          <div className={styles.date}>
            <span>{meta.createdAsFixedLength()}</span>
          </div>
        ) : <></>}
      </div>
    </section>
  );
}
