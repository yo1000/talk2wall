import {PostMeta} from "@/lib/posts";
import styles from "./Sidebar.module.css";
import {hiddenTags} from "@/lib/hiddenTags";
import Legend from "@/components/Legend";

export default function Sidebar(
  {meta}: {meta: PostMeta}
) {
  return (
    <section className={styles.Sidebar}>
      {meta.toc ? (
        <nav className={styles.toc}>
          <Legend text={"TABLE OF CONTENT"}/>
          <div dangerouslySetInnerHTML={{__html: meta.toc}}></div>
        </nav>
      ) : <></>}
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
